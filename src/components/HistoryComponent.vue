<template>
    <div>
        <div v-if="loading" class="loading-container">
            <div class="loading-message">
                <p>Cargando...</p>
                <img src="@/assets/Loading.gif" alt="Cargando..." class="GifLoading">
            </div>
        </div>
        <ul v-else class="transaction-list">
            <li v-for="transaction in transactions" :key="transaction._id" class="transaction-item">
                <div class="transaction-info">
                    <p>{{ getTransactionType(transaction.action) }} de <strong>{{ transaction.crypto_amount }}</strong> {{ transaction.crypto_code }}</p>
                    <p>Precio: {{ transaction.money }}</p>
                </div>
                <div class="transaction-actions">
                    <button class="btn-view" @click="viewTransaction(transaction._id)">Ver</button>
                    <button class="btn-edit" @click="editTransaction(transaction._id)">Editar</button>
                    <button class="btn-delete" @click="deleteTransaction(transaction._id)">Eliminar</button>
                </div>
            </li>
        </ul>
        <p v-if="transactions.length === 0 && !loading" class="no-transactions">No hay movimientos registrados.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';

const transactions = ref([]);
const loading = ref(true);
const userStore = useUserStore();
const router = useRouter();

const fetchTransactions = async () => {
    try {
        const response = await apiClient.get(`/transactions?q={"user_id":"${userStore.userName}"}`);
        transactions.value = response.data;
    } catch (error) {
        console.error('Error al obtener los movimientos:', error);
    } finally {
        loading.value = false;
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
            fetchTransactions(); 
            alert('Transacción eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar la transacción:', error);
        }
    }
};

const getTransactionType = (action) => {
    return action === 'purchase' ? 'Compra' : 'Venta';
};

onMounted(fetchTransactions);
</script>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    font-size: 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

.loading-message {
    text-align: center;
    color: #555;
}

.GifLoading {
    width: 150px;
}

.transaction-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    border-bottom: 1px solid #ddd;
}

.transaction-info p {
    margin: 0;
}

.transaction-actions {
    display: flex;
    gap: 0.5em;
}

.btn-view, .btn-edit, .btn-delete {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5em 1em;
    cursor: pointer;
}

.btn-view:hover, .btn-edit:hover, .btn-delete:hover {
    background-color: #0056b3;
}

.no-transactions {
    text-align: center;
    font-size: 1.2em;
    color: #555;
}
</style>

