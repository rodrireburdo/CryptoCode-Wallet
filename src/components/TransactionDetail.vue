<template>
    <div class="container-detail">
        <LoadingComponent v-if="loading" />
        <div v-else-if="transaction" class="transaction-details">
            <h1>Detalles de la Transacción</h1>
            <p><strong class="text-1">Crypto</strong><strong class="text-2">Code</strong></p>
            <p><strong>ID:</strong> {{ transaction._id }}</p>
            <p><strong>Criptomoneda:</strong> {{ transaction.crypto_code }}</p>
            <p><strong>Cantidad:</strong> {{ transaction.crypto_amount }}</p>
            <p><strong>Precio:</strong> {{ transaction.money }}</p>
            <p><strong>Acción:</strong> {{ translatedAction(transaction.action) }}</p>
            <p><strong>Fecha y Hora:</strong> {{ formatDatetime(transaction.datetime) }}</p>
            <div class="button-container">
                <button @click="goBack" class="btn-back">Volver</button>
                <button @click="printTransaction" class="btn-print">Imprimir</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';
import LoadingComponent from './LoadingComponent.vue';

const route = useRoute();
const router = useRouter();
const transaction = ref(null);
const loading = ref(true);

const fetchTransaction = async () => {
    try {
        const response = await apiClient.get(`/transactions/${route.params.id}`);
        transaction.value = response.data;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
    } finally {
        loading.value = false;
    }
};

const formatDatetime = (datetime) => {
    const date = new Date(datetime);
    // Verificar si la fecha es válida
    if (!isNaN(date.getTime())) {
        return date.toLocaleString('es-ES', { 
            dateStyle: 'short', 
            timeStyle: 'short',
            hour12: false 
        });
    } else {
        return 'Fecha no válida';
    }
};

const translatedAction = (action) => {
    return action === 'purchase' ? 'Compra' : 'Venta';
};

const goBack = () => {
    router.push({ name: 'HistoryView' });
};

const printTransaction = () => {
    window.print();
};

onMounted(fetchTransaction);
</script>

<style scoped lang="scss">
.container-detail {
    padding-top: 50px;
}
.transaction-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: $background-primary;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.transaction-details h1 {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.text-2 {
    color: $primary-color;
    font-size: 30px;
}

.text-1 {
    color: $secondary-color;
    font-size: 30px;
}

.transaction-details p {
    font-size: 18px;
    margin: 10px 0;
}

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.btn-back,
.btn-print {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-back:hover,
.btn-print:hover {
    background-color: $secondary-color;
}
</style>
