<template>
    <div>
        <form class="login-form">
            <label for="username" class="label-username">Ingresa tu nombre de usuario</label>
            <p v-if="error" class="error-message">*Debe ingresar un nombre de usuario</p>
            <input v-model="userName" id="username" class="input-username" type="text" required/>
            <button @click="access" class="btn-access">Acceder</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const userName = ref('');
const router = useRouter();

const error = ref(false);
const access = () => {
    if (!userName.value) {
        error.value = true;
        return;
    }
    userStore.setUserName(userName.value); 
    router.push({ name: 'InitialView' });
};
</script>

<style scoped>

.login-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.label-username {
    display: block;
    margin-bottom: 10px;
    color: #333;
}

.input-username {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-access {
    padding: 10px 10px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-access:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-bottom: 10px;
}
</style>

