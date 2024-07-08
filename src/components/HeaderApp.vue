<template>
    <div class="header">
        <img src="../assets/logo.png" alt="Logo" class="imgLogo">
        <div class="dropdown" @click="toggleDropdown">
            <button>{{ buttonText }}</button>
            <div v-if="showDropdown" class="dropdown-content">
                <a v-if="userName" @click="logout">Cerrar Sesión</a>
                <a v-else @click="login">Iniciar Sesión</a>
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

const login = () => {
    router.push({ name: 'LoginView' });
};

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
}

.imgLogo {
    height: 40px;
    margin-right: 20px;
}

.dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
}

.dropdown-content a {
    text-decoration: none;
    display: block;
    padding: 8px 0;
}

.dropdown:hover .dropdown-content {
    display: block;
    cursor: pointer;
}

button {
    padding: 10px 20px;
    font-size: 16px;
}
</style>