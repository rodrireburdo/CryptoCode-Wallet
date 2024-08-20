<template>
    <div>
        <form @submit.prevent="submitTransaction" class="form">
            <label for="crypto">Criptomoneda:</label>
            <select v-model="crypto" @change="fetchCryptoPrice">
                <option value="" disabled>Seleccione una criptomoneda</option>
                <option value="btc">Bitcoin (BTC)</option>
                <option value="dai">Dai (DAI)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="wld">Worldcoin (WLD)</option>
            </select>

            <label for="amount">Cantidad:</label>
            <input type="number" v-model="amount" @input="updatePrice" step="0.00001"/>

            <label for="total">Total a recibir (ARS):</label>
            <input type="number" v-model="totalReceived" step="0.01" readonly />

            <button type="submit">Vender</button>
            <p v-if="formError" class="error-message">{{ formError }}</p>
        </form>

        <LoadingModal v-if="loading" />
        <SuccessModal v-if="successModal" @close="successModal = false" :message="successMessage" />
        <ErrorModal v-if="errorModal" @close="errorModal = false" :message="errorMessage" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore';
import apiClient from '@/services/apiClient';
import LoadingModal from '@/components/LoadingModal.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import ErrorModal from '@/components/ErrorModal.vue';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const cryptoPricesStore = useCryptoPricesStore();
const cryptoBalanceStore = useCryptoBalanceStore();

const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0);
const totalReceived = ref(0);
const loading = ref(false);
const successModal = ref(false);
const errorModal = ref(false);
const formError = ref('');

onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userName.value);
    } catch (error) {
        errorModal.value = true;
    }
});

const fetchCryptoPrice = async () => {
    if (!crypto.value) return;

    await cryptoPricesStore.fetchPrices();
    unitPrice.value = cryptoPricesStore.prices[crypto.value]?.bid;
    if (unitPrice.value) {
        updatePrice();
    } else {
        formError.value = 'Error al obtener el precio de la criptomoneda';
    }
};

const updatePrice = () => {
    if (amount.value && unitPrice.value) {
        totalReceived.value = (amount.value * unitPrice.value).toFixed(2);
    } else {
        totalReceived.value = 0;
    }
};

const resetForm = () => {
    crypto.value = '';
    amount.value = '';
    unitPrice.value = 0;
    totalReceived.value = 0;
    formError.value = '';
};

const submitTransaction = async () => {
    formError.value = '';

    if (amount.value <= 0 || totalReceived.value <= 0) {
        formError.value = 'Seleccione una criptomoneda y la cantidad a vender';
        return;
    }

    if (amount.value > cryptoBalanceStore.balances[crypto.value]) {
        formError.value = 'No tienes suficiente cantidad de la criptomoneda seleccionada';
        return;
    }

    const now = new Date();
    const formattedDatetime = now.toISOString();

    const transaction = {
        user_id: userName.value,
        action: 'sale',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalReceived.value,
        datetime: formattedDatetime,
    };

    loading.value = true;

    try {
        await apiClient.post('/transactions', transaction);
        cryptoBalanceStore.updateBalance(crypto.value, amount.value, 'sale');
        successModal.value = true;
        resetForm();
    } catch (error) {
        errorModal.value = true;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped lang="scss">
.form {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input,
select {
    padding: 8px;
    margin-top: 5px;
}

button {
    margin-top: 15px;
    padding: 10px;
    background-color: $primary-color;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: $secondary-color;
}

.error-message {
    display: flex;
    justify-content: center;
    color: $error-color;
}
</style>