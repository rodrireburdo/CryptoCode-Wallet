<template>
    <div class="actual-state">
        <h2>Estado Actual de Criptomonedas</h2>
        <ul>
            <li v-for="(balance, crypto) in filteredBalances" :key="crypto">
                <p>{{ crypto.toUpperCase() }}: {{ balance }}</p>
                <p>Valor de Venta: ${{ getCryptoValueInPesos(crypto, balance) }}</p>
            </li>
        </ul>
        <p v-if="totalValueInPesos > 0">Total: ${{ totalValueInPesos }}</p>
        <p v-else>No tienes criptomonedas registradas.</p>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';

const userStore = useUserStore();
const cryptoBalanceStore = useCryptoBalanceStore();
const cryptoPricesStore = useCryptoPricesStore();

onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userStore.userName);
        await cryptoPricesStore.fetchPrices();
    } catch (error) {
        console.error('Error al obtener balances o precios:', error);
    }
});

const filteredBalances = computed(() => {
    const balances = cryptoBalanceStore.balances;
    return Object.fromEntries(
        Object.entries(balances).filter(([, amount]) => amount > 0)
    );
});

const getCryptoValueInPesos = (crypto, amount) => {
    const price = cryptoPricesStore.prices[crypto]?.bid || 0;
    return (price * amount).toFixed(2);
};

const totalValueInPesos = computed(() => {
    return Object.entries(filteredBalances.value).reduce((total, [crypto, amount]) => {
        const valueInPesos = getCryptoValueInPesos(crypto, amount);
        return total + parseFloat(valueInPesos);
    }, 0).toFixed(2);
});
</script>

<style scoped>
.actual-state {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.actual-state h2 {
    margin-bottom: 20px;
}

.actual-state ul {
    list-style: none;
    padding: 0;
}

.actual-state li {
    margin-bottom: 10px;
}

.actual-state p {
    margin: 5px 0;
}
</style>
