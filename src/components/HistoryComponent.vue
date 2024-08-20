<template>
    <div>
        <LoadingComponent v-if="loading"/>
        <ul v-else class="transaction-list">
            <li v-for="transaction in transactions" :key="transaction._id" class="transaction-item">
                <div class="transaction-info">
                    <p>{{ getTransactionType(transaction.action) }} de <strong>{{ transaction.crypto_amount }}</strong> {{ transaction.crypto_code }}</p>
                    <p>$ {{ transaction.money }}</p>
                </div>
                <div class="transaction-actions">
                    <button class="btn-view" @click="viewTransaction(transaction._id)"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-edit" @click="editTransaction(transaction._id)"><i class="fa-solid fa-file-pen"></i></button>
                    <button class="btn-delete" @click="deleteTransaction(transaction._id)"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>
        </ul>
        <p v-if="transactions.length === 0 && !loading" class="no-transactions">No hay movimientos registrados.</p>
        <LoadingModal v-if="deleteLoading" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'vue-router';
import LoadingModal from '@/components/LoadingModal.vue';
import LoadingComponent from './LoadingComponent.vue';


const transactions = ref([]);
const loading = ref(true);
const deleteLoading = ref(false);
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
    deleteLoading.value = true;
    try {
        await apiClient.delete(`/transactions/${id}`);
        fetchTransactions(); 
    } catch (error) {
        console.error('Error al eliminar la transacción:', error);
    } finally {
        deleteLoading.value = false;
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
    margin: 0;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 50px;
    border-bottom: 1px solid #ddd;
}

.transaction-info p {
    margin: 0;
}

.transaction-actions {
    display: flex;
    gap: 10px;
}

.btn-view, .btn-edit, .btn-delete {
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

.btn-view {
    background-color: $background-view;
}
.btn-view:hover{
    background-color: $background-view2;
}

.btn-edit {
    background-color: $background-edit;
}
.btn-edit:hover {
    background-color: $background-edit2;
}

.btn-delete {
    background-color: $background-delete;
}
.btn-delete:hover {
    background-color: $background-delete2;
}

.no-transactions {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>

