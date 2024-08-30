<template>
    <section class="chart-container">
        <div class="chart">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </section>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, onMounted } from 'vue'
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore'
import { useUserStore } from '@/stores/useUserStore'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const cryptoBalanceStore = useCryptoBalanceStore()
const userStore = useUserStore()

onMounted(async () => {
    await cryptoBalanceStore.fetchBalances(userStore.userName)
})

const chartData = computed(() => ({
    labels: ['BTC', 'DAI', 'ETH', 'USDT', 'WLD'],
    datasets: [
        {
            label: ' ',
            backgroundColor: ['#FF6455', '#F8BD4A', '#A5B1C2', '#4AB9B1', '#CCCFC9'],
            data: [
                cryptoBalanceStore.balances.btc,
                cryptoBalanceStore.balances.dai,
                cryptoBalanceStore.balances.eth,
                cryptoBalanceStore.balances.usdt,
                cryptoBalanceStore.balances.wld
            ]
        }
    ]
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            labels: {
                boxWidth: 0,
            }
        },
        title: {
            display: true,
            text: 'Cantidad de Criptomonedas'
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

.chart {
    width: 400px;
    height: 300px;
}
</style>