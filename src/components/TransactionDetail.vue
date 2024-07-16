<template>
    <div v-if="visible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div v-if="transaction">
                <h1>Detalles de la Transacción</h1>
                <p>ID: {{ transaction._id }}</p>
                <p>Criptomoneda: {{ transaction.crypto_code }}</p>
                <p>Cantidad: {{ transaction.crypto_amount }}</p>
                <p>Precio: {{ transaction.money }}</p>
                <p>Acción: {{ transaction.action }}</p>
                <p>Fecha y Hora: {{ transaction.datetime }}</p>
                <button @click="closeModal">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/services/apiClient';
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: Boolean,
    transactionId: String
});

const emit = defineEmits(['update:visible']);

const transaction = ref(null);

const fetchTransaction = async () => {
    try {
        const response = await apiClient.get(`/transactions/${props.transactionId}`);
        transaction.value = response.data;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
    }
};

const closeModal = () => {
    emit('update:visible', false);
};

watch(() => props.transactionId, fetchTransaction);
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
}
</style>