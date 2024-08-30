<template>
    <div>
        <LoadingComponent v-if="loading" />
        <div v-else-if="transaction">
            <h2>Editar Transacción</h2>
            <form @submit.prevent="submitEdit" class="form">
                <label for="crypto">Criptomoneda:</label>
                <select v-model="transaction.crypto_code" id="crypto" class="form-input" required>
                    <option value="" disabled>Seleccione una criptomoneda</option>
                    <option value="btc">Bitcoin (BTC)</option>
                    <option value="dai">Dai (DAI)</option>
                    <option value="eth">Ethereum (ETH)</option>
                    <option value="usdt">Tether (USDT)</option>
                    <option value="wld">Worldcoin (WLD)</option>
                </select>
                
                <label for="amount">Cantidad:</label>
                <input v-model="transaction.crypto_amount" id="amount" type="number" step="0.00001" class="form-input" />
                
                <label for="money">Precio:</label>
                <input v-model="transaction.money" id="money" type="number" step="0.01" class="form-input" />
                
                <p v-if="errors" class="error-message">No puedes introducir valores menores a 0.</p>
                
                <div class="button-container">
                    <button type="submit" class="btn-submit">Guardar Cambios</button>
                    <button type="button" class="btn-submit" @click="cancelEdit">Cancelar</button>
                </div>
            </form>
        </div>
        <LoadingModal v-if="isLoading" />
        <SuccessModal v-if="isSuccess" @close="handleCloseModal" />
        <ErrorModal v-if="isError" @close="handleCloseModal" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';
import LoadingComponent from './LoadingComponent.vue';
import LoadingModal from './modals/LoadingModal.vue';
import SuccessModal from './modals/SuccessModal.vue';
import ErrorModal from './modals/ErrorModal.vue';

const route = useRoute();
const router = useRouter();
const transaction = ref(null);
const loading = ref(true);
const isLoading = ref(false);
const isSuccess = ref(false);
const isError = ref(false);
const errors = ref(false);

const fetchTransaction = async () => {
    try {
        const response = await apiClient.get(`/transactions/${route.params.id}`);
        transaction.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
        loading.value = false;
    }
};

const validate = () => {
    errors.value = transaction.value.crypto_amount < 0 || transaction.value.money < 0;
};

const submitEdit = async () => {
    validate();
    if (errors.value) {
        return;
    }

    isLoading.value = true;
    try {
        await apiClient.patch(`/transactions/${route.params.id}`, {
            crypto_code: transaction.value.crypto_code,
            crypto_amount: transaction.value.crypto_amount,
            money: transaction.value.money,
        });
        isLoading.value = false;
        isSuccess.value = true;
    } catch (error) {
        isLoading.value = false;
        isError.value = true;
        console.error('Error al actualizar la transacción:', error);
    }
};

const cancelEdit = () => {
    router.push({ name: 'HistoryView' });
};

const handleCloseModal = () => {
    isSuccess.value = false;
    isError.value = false;
    router.push({ name: 'HistoryView' });
};

onMounted(fetchTransaction);
</script>

<style scoped lang="scss">

h2 {
    text-align: center;
    font-size: 25px;
}

.form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

.form-input {
    padding: 8px;
    margin-top: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
}

.error-message {
    color: $error-color;
    font-size: 0.9rem;
    margin-top: 10px;
    text-align: center;
}

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.btn-submit {
    padding: 10px;
    background-color: $secondary-color;
    color: white;
    border: none;
    cursor: pointer;
}

.btn-submit:hover {
    background-color: $primary-color;
}
</style>