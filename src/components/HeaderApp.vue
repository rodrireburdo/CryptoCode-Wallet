<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/logo.png" alt="Logo" class="imgLogo">
            <h1>CriptoCode</h1>
        </div>
        <div class="dropdown" @click="toggleDropdown">
            <button>{{ buttonText }}</button>
            <div v-if="showDropdown" class="dropdown-content">
                <a v-if="userName" @click="logout">Cerrar Sesión</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const buttonText = computed(() => {
    return userName.value ? userName.value : 'Inicie Sesión';
});

const logout = () => {
    userStore.setUserName('');
    localStorage.removeItem('userName');
    router.push({ name: 'HomeView' });
    showDropdown.value = false;
};
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 50px 10px 50px;
}

.logo {
    display: flex;
    align-items: center;
    height: 60px;
}

.imgLogo {
    height: 60px;
    margin-right: 20px;
}

.dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.dropdown-content {
    display: none; /* Inicialmente oculto */
    position: absolute;
    top: 100%; /* Posiciona abajo del botón */
    left: 50%; /* Centrado horizontalmente */
    transform: translateX(-50%); /* Ajusta para centrar horizontalmente */
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    min-width: 100px;
    z-index: 1;
}

.dropdown-content a {
    text-decoration: none;
    display: block; /* Bloque en lugar de flex para centrar */
    text-align: center; /* Centrado del texto */
}

.dropdown:hover .dropdown-content {
    display: block; /* Mostrar cuando se pasa el mouse */
}

button {
    padding: 10px 20px;
    min-width: 100px;
    font-size: 16px;
}
</style>