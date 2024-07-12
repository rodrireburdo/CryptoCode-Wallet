<template>
    <div>
        <ul class="transaction-list">
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
        <p v-if="transactions.length === 0" class="no-transactions">No hay movimientos registrados.</p>
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

const getTransactionType = (action) => {
    return action === 'purchase' ? 'Compra' : 'Venta';
};

onMounted(fetchTransactions);
</script>

<style scoped lang="scss">
.transaction-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.transaction-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.transaction-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.transaction-info {
    margin-bottom: 10px;
}

.transaction-actions {
    display: flex;
    gap: 10px;
}

.btn-view, .btn-edit, .btn-delete {
    background-color: $primary-color;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.btn-view:hover, .btn-edit:hover, .btn-delete:hover {
    background-color: $secondary-color;
}

.no-transactions {
    text-align: center;
    margin-top: 20px;
    color: #888;
}
</style>