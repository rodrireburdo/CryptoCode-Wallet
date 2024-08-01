<template>
    <div class="div-login">
        <form class="login-form" @submit.prevent="access">
            <label for="username" class="label-username">Ingresa tu nombre de usuario</label>
            <p v-if="error" class="error-message">*Debe ingresar un nombre de usuario</p>
            <p v-if="lengthError" class="error-message">*El nombre de usuario debe tener al menos 6 caracteres</p>
            <p v-if="uppercaseError" class="error-message">*El nombre de usuario debe contener al menos una letra mayúscula</p>
            <input v-model="userName" id="username" class="input-username" type="text" required/>
            <button type="submit" class="btn-access">Acceder</button>
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
const lengthError = ref(false);
const uppercaseError = ref(false);

const access = () => {
    error.value = false;
    lengthError.value = false;
    uppercaseError.value = false;

    if (!userName.value) {
        error.value = true;
        return;
    }

    if (userName.value.length < 6) {
        lengthError.value = true;
        return;
    }

    if (!/[A-Z]/.test(userName.value)) {
        uppercaseError.value = true;
        return;
    }

    userStore.setUserName(userName.value); 
    router.push({ name: 'InitialView' });
};
</script>

<style scoped lang="scss">
html, body {
    height: 100%;
    margin: 0;
}

.div-login {
    background-color: $secondary-color;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 20px; /* Espacio alrededor del formulario */
    box-sizing: border-box;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: $background-primary;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
}

.label-username {
    margin-bottom: 15px;
    color: #333;
}

.input-username {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
}

.btn-access {
    padding: 10px 20px;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.btn-access:hover {
    background-color: $secondary-color;
}

.error-message {
    color: red;
    margin-bottom: 10px;
}
</style>
