<template>
    <div v-if="transaction">
        <h1>Detalles de la Transacción</h1>
        <p>ID: {{ transaction._id }}</p>
        <p>Criptomoneda: {{ transaction.crypto_code }}</p>
        <p>Cantidad: {{ transaction.crypto_amount }}</p>
        <p>Precio: {{ transaction.money }}</p>
        <p>Acción: {{ transaction.action }}</p>
        <p>Fecha y Hora: {{ transaction.datetime }}</p>
        <button @click="goBack">Volver</button>
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

const goBack = () => {
    router.push({ name: 'HistoryView' });
};

onMounted(fetchTransaction);
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

p {
    margin: 10px 0;
}

button {
    display: block;
    margin: 20px auto;
}
</style>
