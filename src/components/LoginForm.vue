<template>
    <div>
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
.login-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-color: $background-primary;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.label-username {
    margin-bottom: 10px;
    color: #333;
}

.input-username {
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn-access {
    padding: 10px 10px;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-access:hover {
    background-color: $secondary-color;
}

.error-message {
    color: red;
}
</style>
