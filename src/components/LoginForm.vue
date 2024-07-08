<template>
    <div>
        <label for="username">Ingresa tu nombre de usuario</label>
        <input v-model="userName" id="username" type="text" />
        <button @click="access">Acceder</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const userName = ref('');
const router = useRouter();

const access = () => {
    userStore.setUserName(userName.value);
    router.push({ name: 'InitialView' });
};
</script>

<style scoped>

</style>