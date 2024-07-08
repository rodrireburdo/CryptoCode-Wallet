<template>
    <div>
        <h1>Historial de Movimientos</h1>
        <ul>
            <li v-for="transaction in transactions" :key="transaction._id">
                <p>Criptomoneda: {{ transaction.crypto_code }}</p>
                <p>Cantidad: {{ transaction.crypto_amount }}</p>
                <p>Precio: {{ transaction.money }}</p>
                <p>Acción: {{ transaction.action }}</p>
                <p>Fecha y Hora: {{ transaction.datetime }}</p>
                <button @click="viewTransaction(transaction._id)">Ver</button>
                <button @click="editTransaction(transaction._id)">Editar</button>
                <button @click="deleteTransaction(transaction._id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const transactions = ref([]);
const userStore = useUserStore();
const router = useRouter();

const fetchTransactions = async () => {
    try {
        const response = await apiClient.get(`/transactions?q={"user_id":"${userStore.userName}"}`);
        transactions.value = response.data;
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
    }
};

const viewTransaction = (id) => {
    router.push({ name: 'TransactionDetail', params: { id } });
};

const editTransaction = (id) => {
    router.push({ name: 'TransactionEdit', params: { id } });
};

const deleteTransaction = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
        try {
            await apiClient.delete(`/transactions/${id}`);
            fetchTransactions(); // Refresh the list after deletion
            alert('Transacción eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar la transacción:', error);
        }
    }
};

onMounted(fetchTransactions);
</script>

<style scoped>
/* Estilos básicos para el historial de movimientos */
h1 {
    text-align: center;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

button {
    margin-right: 10px;
}
</style>
