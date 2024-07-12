<template>
    <div>
        <form @submit.prevent="submitTransaction" class="form">
            <label for="crypto">Criptomoneda:</label>
            <select v-model="crypto" @change="fetchCryptoPrice" required>
                <option value="" disabled>Seleccione una criptomoneda</option>
                <option value="btc">Bitcoin (BTC)</option>
                <option value="dai">Dai (DAI)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="wld">Worldcoin (WLD)</option>
            </select>

            <label for="amount">Cantidad:</label>
            <input type="number" v-model="amount" @input="updatePrice" step="0.00001" required />

            <label for="price">Precio (ARS por unidad):</label>
            <input type="number" v-model="unitPrice" step="0.01" readonly />

            <label for="total">Total a recibir (ARS):</label>
            <input type="number" v-model="totalReceived" step="0.01" readonly />

            <button type="submit">Vender</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore';
import apiClient from '@/services/apiClient';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const cryptoPricesStore = useCryptoPricesStore();
const cryptoBalanceStore = useCryptoBalanceStore();

// Variables reactivas para los campos del formulario
const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0);
const totalReceived = ref(0);

const fetchCryptoPrice = async () => {
    if (!crypto.value) return;

    await cryptoPricesStore.fetchPrices();
    unitPrice.value = cryptoPricesStore.prices[crypto.value]?.bid;
    if (unitPrice.value) {
        updatePrice();
    } else {
        alert('Error al obtener el precio de la criptomoneda');
    }
};

const updatePrice = () => {
    if (amount.value && unitPrice.value) {
        totalReceived.value = (amount.value * unitPrice.value).toFixed(2);
    } else {
        totalReceived.value = 0;
    }
};

const submitTransaction = async () => {
    if (amount.value <= 0 || totalReceived.value <= 0) {
        alert('La cantidad y el total a recibir deben ser mayores a 0');
        return;
    }

    // Verificar si el usuario tiene suficiente cantidad de la criptomoneda seleccionada
    if (amount.value > cryptoBalanceStore.balances[crypto.value]) {
        alert('No tienes suficiente cantidad de la criptomoneda seleccionada');
        return;
    }

    const now = new Date();
    const formattedDatetime = now.toLocaleString('en-GB', { hour12: false }).replace(',', '');

    const transaction = {
        user_id: userName.value,
        action: 'sale',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalReceived.value,
        datetime: formattedDatetime,
    };

    try {
        await apiClient.post('/transactions', transaction);
        cryptoBalanceStore.updateBalance(crypto.value, amount.value, 'sale');
        alert('Transacción guardada con éxito');
    } catch (error) {
        console.error('Error al guardar la transacción:', error);
        alert('Hubo un error al guardar la transacción');
    }
};
</script>


<style scoped lang="scss">
.form {
    max-width: 600px;
    margin: 0 auto;
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
</style>