<template>
    <div class="actual-state">
        <div v-if="loading" class="loading-message">
            <p>Cargando...</p>
            <img src="@/assets/Loading.gif" alt="Cargando..." class="GifLoading">
        </div>
        <div v-else-if="Object.keys(filteredBalances).length > 0" class="chart-container">
            <ActualState :balances="filteredBalances"/>
            <BarChart :balances="filteredBalances" class="bar"/>
            <PieChart :balances="filteredBalances" class="pie"/>
        </div>
        <section v-else class="error-message">
            <p>No tienes criptomonedas registradas.</p>
        </section>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
import ActualState from './ActualState.vue';

const userStore = useUserStore();
const cryptoBalanceStore = useCryptoBalanceStore();
const loading = ref(true);

onMounted(async () => {
    try {
        console.log('Fetching balances for user:', userStore.userName);
        await cryptoBalanceStore.fetchBalances(userStore.userName);
        console.log('Balances fetched:', cryptoBalanceStore.balances);
    } catch (error) {
        console.error('Error al obtener balances:', error);
    } finally {
        loading.value = false;
    }
});

const filteredBalances = computed(() => {
    const balances = cryptoBalanceStore.balances;
    console.log('Calculating filtered balances from:', balances);
    return Object.fromEntries(
        Object.entries(balances).filter(([, amount]) => amount > 0)
    );
});
</script>
<style scoped>
.chart-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.loading-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #555;
}

.GifLoading {
    width: 150px;
    margin-top: 10px;
}

.error-message {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>