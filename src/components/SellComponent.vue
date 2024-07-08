<template>
    <div>
        <form @submit.prevent="submitTransaction">
            <label for="crypto">Criptomoneda:</label>
            <select v-model="crypto" @change="fetchCryptoPrice" required>
                <option value="" disabled>Seleccione una criptomoneda</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="usdc">USDC</option>
                <option value="ethereum">Ethereum</option>
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
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import apiClient from '@/services/apiClient';
import axios from 'axios';

const userStore = useUserStore();
const userName = userStore.userName;

// Variables reactivas para los campos del formulario
const crypto = ref('');
const amount = ref('');
const unitPrice = ref(0); // Precio unitario de la criptomoneda
const totalReceived = ref(0); // Total a recibir en ARS

// Obtener el precio de la criptomoneda seleccionada
const fetchCryptoPrice = async () => {
    if (!crypto.value) return;

    const endpointMap = {
        bitcoin: 'argenbtc/btc/ars',
        usdc: 'argenbtc/usdc/ars',
        ethereum: 'argenbtc/eth/ars'
    };

    const endpoint = endpointMap[crypto.value];
    if (!endpoint) return;

    try {
        const response = await axios.get(`https://criptoya.com/api/${endpoint}`);
        unitPrice.value = response.data.totalBid; // Usar el valor adecuado de la respuesta de la API
        updatePrice();
    } catch (error) {
        console.error('Error al obtener el precio de la criptomoneda:', error);
        alert('Hubo un error al obtener el precio de la criptomoneda');
    }
};

// Actualizar el precio total basado en la cantidad de criptomoneda
const updatePrice = () => {
    if (amount.value && unitPrice.value) {
        totalReceived.value = (amount.value * unitPrice.value).toFixed(2);
    } else {
        totalReceived.value = 0;
    }
};

// Enviar la transacción de venta a la API
const submitTransaction = async () => {
    // Validar que los datos sean correctos
    if (amount.value <= 0 || totalReceived.value <= 0) {
        alert('La cantidad y el total a recibir deben ser mayores a 0');
        return;
    }

    // Capturar la fecha y hora actual
    const now = new Date();
    const formattedDatetime = now.toLocaleString('en-GB', { hour12: false }).replace(',', '');

    // Construir el objeto de la transacción
    const transaction = {
        user_id: userName,
        action: 'sale',
        crypto_code: crypto.value,
        crypto_amount: amount.value,
        money: totalReceived.value,
        datetime: formattedDatetime
    };

    // Enviar la solicitud POST a la API
    try {
        await apiClient.post('/transactions', transaction);
        alert('Transacción de venta realizada con éxito');
    } catch (error) {
        console.error('Error al realizar la transacción de venta:', error);
        alert('Hubo un error al realizar la transacción de venta');
    }
};
</script>

<style scoped>
/* Estilos para el formulario */
form {
    display: flex;
    flex-direction: column;
}

label,
input,
select,
button {
    margin: 8px 0;
}
</style>