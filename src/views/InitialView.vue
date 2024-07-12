<template>

    <HeaderApp/>
    <NavApp/>

    <div>
        <h1>Bienvenido, {{ userName }}, A las transacciones</h1>
    </div>

    <ActualState/>

    <GraficoComponente/>
    
</template>

<script setup>

    import HeaderApp from '../components/HeaderApp.vue'
    import NavApp from '@/components/NavApp.vue';
    import ActualState from '@/components/ActualState.vue';
    import GraficoComponente from '@/components/GraficoComponente.vue';

import { computed } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const userName = computed(() => userStore.userName);
</script>

<style scoped>
</style>