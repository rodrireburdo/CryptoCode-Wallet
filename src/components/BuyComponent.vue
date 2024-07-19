<template>
    <div>
        <form @submit.prevent="submitTransaction">
            <label for="crypto">Criptomoneda:</label>
            <select v-model="crypto" @change="fetchCryptoPrice" required>
                <option value="" disabled>Seleccione una criptomoneda</option>
                <option value="btc">Bitcoin (BTC)</option>
                <option value="dai">Dai (DAI)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="wld">Worldcoin (WLD)</option>
            </select>

            <button type="button" @click="toggleInputMode">
                {{ inputMode === 'crypto' ? 'Cambiar a Monto en ARS' : 'Cambiar a Cantidad de Criptomonedas' }}
            </button>

            <label v-if="inputMode === 'crypto'" for="amount">Cantidad de Criptomonedas:</label>
            <input v-if="inputMode === 'crypto'" type="number" v-model="amount" @input="updatePriceFromAmount"
                step="0.00001" required />

            <label v-if="inputMode === 'money'" for="money">Monto en ARS:</label>
            <input v-if="inputMode === 'money'" type="number" v-model="money" @input="updateAmountFromMoney" step="0.01"
                required />

            <label v-if="inputMode === 'crypto'" for="price">Precio (ARS):</label>
            <input v-if="inputMode === 'crypto'" type="number" v-model="price" step="0.01" readonly />

            <label v-if="inputMode === 'money'" for="cryptoAmount">Cantidad de Criptomonedas a Comprar:</label>
            <input v-if="inputMode === 'money'" type="number" v-model="calculatedAmount" step="0.00001" readonly />

            <button type="submit">Guardar</button>
        </form>

        <LoadingModal v-if="loading" />
        <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false" />
        <ErrorModal v-if="showErrorModal" @close="showErrorModal = false" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';
import apiClient from '@/services/apiClient';
import LoadingModal from '@/components/LoadingModal.vue';
import SuccessModal from '@/components/SuccessModal.vue';
import ErrorModal from '@/components/ErrorModal.vue';

const userStore = useUserStore();
const cryptoPricesStore = useCryptoPricesStore();
const userName = userStore.userName;

// Variables reactivas para los campos del formulario
const crypto = ref('');
const amount = ref('');
const money = ref('');
const price = ref('');
const unitPrice = ref(0); // Precio unitario de la criptomoneda
const inputMode = ref('crypto'); // Modo de entrada: 'crypto' o 'money'
const calculatedAmount = ref(''); // Cantidad de criptomonedas calculada a partir del monto en ARS
const loading = ref(false); // Estado de carga
const showSuccessModal = ref(false); // Mostrar modal de éxito
const showErrorModal = ref(false); // Mostrar modal de error

// Alternar el modo de entrada
const toggleInputMode = () => {
    inputMode.value = inputMode.value === 'crypto' ? 'money' : 'crypto';
    clearFormFields();
};

// Obtener el precio de la criptomoneda seleccionada
const fetchCryptoPrice = () => {
    if (!crypto.value) return;
    unitPrice.value = cryptoPricesStore.prices[crypto.value].ask || 0;
    updatePriceFromAmount();
};

// Actualizar el precio total basado en la cantidad de criptomonedas
const updatePriceFromAmount = () => {
    if (amount.value && unitPrice.value) {
        price.value = (amount.value * unitPrice.value).toFixed(2);
        money.value = '';
        calculatedAmount.value = '';
    } else {
        price.value = 0;
    }
};

// Actualizar la cantidad de criptomonedas basado en el monto de dinero
const updateAmountFromMoney = () => {
    if (money.value && unitPrice.value) {
        calculatedAmount.value = (money.value / unitPrice.value).toFixed(5);
        price.value = money.value;
    } else {
        calculatedAmount.value = 0;
    }
};

// Limpiar los campos del formulario
const clearFormFields = () => {
    crypto.value = '';
    amount.value = '';
    money.value = '';
    price.value = '';
    calculatedAmount.value = '';
};

// Enviar la transacción a la API
const submitTransaction = async () => {
    // Validar que los datos sean correctos
    const finalAmount = inputMode.value === 'crypto' ? amount.value : calculatedAmount.value;
    const finalPrice = inputMode.value === 'crypto' ? price.value : money.value;

    if (finalAmount <= 0 || finalPrice <= 0) {
        alert('La cantidad y el precio deben ser mayores a 0');
        return;
    }

    // Capturar la fecha y hora actual
    const now = new Date();
    const formattedDatetime = now.toLocaleString('en-GB', { hour12: false }).replace(',', '');

    // Construir el objeto de la transacción
    const transaction = {
        user_id: userName,
        action: 'purchase',
        crypto_code: crypto.value,
        crypto_amount: finalAmount,
        money: finalPrice,
        datetime: formattedDatetime
    };

    loading.value = true; // Mostrar el modal de carga
    
    // Enviar la solicitud POST a la API
    try {
        await apiClient.post('/transactions', transaction);
        showSuccessModal.value = true; // Mostrar el modal de éxito
        clearFormFields(); // Limpiar los campos del formulario
    } catch (error) {
        console.error('Error al guardar la transacción:', error);
        showErrorModal.value = true; // Mostrar el modal de error
    } finally {
        loading.value = false; // Ocultar el modal de carga
    }
};

// Llamar a fetchPrices del store cuando el componente se monta
onMounted(() => {
    cryptoPricesStore.fetchPrices();
});
</script>

<style scoped lang="scss">
form {
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