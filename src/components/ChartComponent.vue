<template>
    <div class="actual-state">
        <LoadingComponent v-if="loading"/>
        <div v-else-if="Object.keys(filteredBalances).length > 0" >
            <ActualState/>
                <div class="charts-container">
                    <h2>----- Estadisticas -----</h2>
                    <div class="chart">
                        <BarChart class="bar"/>
                        <PieChart class="pie"/>
                    </div>
                </div>
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
import LoadingComponent from '@/components/LoadingComponent.vue';
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import ActualState from './ActualState.vue';

const userStore = useUserStore();
const cryptoBalanceStore = useCryptoBalanceStore();
const loading = ref(true);

onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userStore.userName);
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
h2 {
    display: flex;
    justify-content: center;
    align-items: center;
}
.chart {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.error-message {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>