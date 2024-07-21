<template>
    <div class="container-edit">
        <LoadingComponent v-if="loading" />
        <div v-else-if="transaction" class="transaction-edit">
            <h1>Editar Transacción</h1>
            <form @submit.prevent="submitEdit" class="edit-form">
                <div class="form-group">
                    <label for="crypto">Criptomoneda:</label>
                    <input v-model="transaction.crypto_code" id="crypto" type="text" class="form-input" />
                </div>
                <div class="form-group">
                    <label for="amount">Cantidad:</label>
                    <input v-model="transaction.crypto_amount" id="amount" type="number" step="0.00001" class="form-input" />
                </div>
                <div class="form-group">
                    <label for="money">Precio:</label>
                    <input v-model="transaction.money" id="money" type="number" step="0.01" class="form-input" />
                </div>
                <div class="button-container">
                    <button type="submit" class="btn-submit">Guardar Cambios</button>
                    <button type="button" class="btn-submit" @click="cancelEdit">Cancelar</button>
                </div>
            </form>
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
        loading.value = false;
    } catch (error) {
        console.error('Error al obtener la transacción:', error);
        loading.value = false;
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

const cancelEdit = () => {
    router.push({ name: 'HistoryView' });
};

onMounted(fetchTransaction);
</script>

<style scoped lang="scss">
.container-edit {
    padding-top: 50px;
}

.transaction-edit {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: $background-primary;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.transaction-edit h1 {
    display: flex;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.edit-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    font-size: 18px;
    margin-bottom: 5px;
    display: block;
}

.form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.btn-submit {
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

.btn-submit:hover {
    background-color: $secondary-color;
}
</style>
