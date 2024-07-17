<template>
    <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { computed, onMounted } from 'vue'
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore'
import { useUserStore } from '@/stores/useUserStore'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement)

const cryptoBalanceStore = useCryptoBalanceStore()
const userStore = useUserStore()

onMounted(async () => {
    await cryptoBalanceStore.fetchBalances(userStore.userName)
})

const totalBalance = computed(() => {
    return Object.values(cryptoBalanceStore.balances).reduce((acc, balance) => acc + balance, 0)
})

const chartData = computed(() => ({
    labels: ['BTC', 'DAI', 'ETH', 'USDT', 'WLD'],
    datasets: [
        {
            label: 'Porcentaje de Criptomonedas',
            backgroundColor: ['#FF6455', '#F8BD4A', '#A5B1C2', '#4AB9B1', '#CCCFC9'],
            data: [
                (cryptoBalanceStore.balances.btc / totalBalance.value) * 100,
                (cryptoBalanceStore.balances.dai / totalBalance.value) * 100,
                (cryptoBalanceStore.balances.eth / totalBalance.value) * 100,
                (cryptoBalanceStore.balances.usdt / totalBalance.value) * 100,
                (cryptoBalanceStore.balances.wld / totalBalance.value) * 100
            ]
        }
    ]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Porcentaje de Criptomonedas'
        },
        legend: {
            position: 'bottom'
        }
    }
}
</script>

<style scoped>
.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>