<template>
    <div v-if="transaction">
        <h1>Editar Transacción</h1>
        <form @submit.prevent="submitEdit">
            <label for="crypto">Criptomoneda:</label>
            <input v-model="transaction.crypto_code" id="crypto" type="text" />

            <label for="amount">Cantidad:</label>
            <input v-model="transaction.crypto_amount" id="amount" type="number" step="0.00001" />

            <label for="money">Precio:</label>
            <input v-model="transaction.money" id="money" type="number" step="0.01" />

            <button type="submit">Guardar Cambios</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';

const route = useRoute();
const router = useRouter();
const transaction = ref(null);

const fetchTransaction = async () => {
    try {
        const response = await apiClient.get(`/transactions/${route.params.id}`);
        transaction.value = response.data;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
    }
};

const submitEdit = async () => {
    try {
        await apiClient.patch(`/transactions/${route.params.id}`, {
            crypto_code: transaction.value.crypto_code,
            crypto_amount: transaction.value.crypto_amount,
            money: transaction.value.money,
        });
        alert('Transacción actualizada con éxito');
        router.push({ name: 'HistoryView' });
    } catch (error) {
        console.error('Error al actualizar la transacción:', error);
    }
};

onMounted(fetchTransaction);
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin: 10px 0 5px;
}

input {
    margin-bottom: 15px;
}

button {
    align-self: center;
}
</style>
