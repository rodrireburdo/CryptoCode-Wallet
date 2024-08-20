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

            <label for="total">Total a pagar (ARS):</label>
            <input type="number" v-model="totalPaid" step="0.01" readonly />

            <button type="submit">Comprar</button>
            <p v-if="formError" class="error-message">{{ formError }}</p>
        </form>

        <LoadingModal v-if="loading" />
        <SuccessModal v-if="successModal" @close="successModal = false" />
        <ErrorModal v-if="errorModal" @close="errorModal = false" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';
import apiClient from '@/services/apiClient';
import LoadingModal from '@/components/LoadingModal.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import ErrorModal from '@/components/ErrorModal.vue';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const cryptoPricesStore = useCryptoPricesStore();

const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0);
const totalPaid = ref(0);
const loading = ref(false);
const successModal = ref(false);
const errorModal = ref(false);
const formError = ref('');

onMounted(async () => {
    try {
        await cryptoPricesStore.fetchPrices();
    } catch (error) {
        errorModal.value = true;
    }
});

const fetchCryptoPrice = async () => {
    if (!crypto.value) return;

    await cryptoPricesStore.fetchPrices();
    unitPrice.value = cryptoPricesStore.prices[crypto.value]?.ask;
    if (unitPrice.value) {
        updatePrice();
    } else {
        formError.value = 'Error al obtener el precio de la criptomoneda';
    }
};

const updatePrice = () => {
    if (amount.value && unitPrice.value) {
        totalPaid.value = (amount.value * unitPrice.value).toFixed(2);
    } else {
        totalPaid.value = 0;
    }
};

const resetForm = () => {
    crypto.value = '';
    amount.value = '';
    unitPrice.value = 0;
    totalPaid.value = 0;
    formError.value = '';
};

const submitTransaction = async () => {
    formError.value = '';

    if (amount.value <= 0 || totalPaid.value <= 0) {
        formError.value = 'Seleccione una criptomoneda y la cantidad a comprar';
        return;
    }

    const now = new Date();
    const formattedDatetime = now.toISOString();

    const transaction = {
        user_id: userName.value,
        action: 'purchase',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalPaid.value,
        datetime: formattedDatetime,
    };

    loading.value = true;

    try {
        await apiClient.post('/transactions', transaction);
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