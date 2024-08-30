<template>
    <div class="actual-state">
        <h2>Tienes ${{ totalValueInPesos }} en criptomonedas</h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 33%;">Criptomoneda</th>
                    <th style="width: 33%;">Cantidad</th>
                    <th style="width: 34%;">Valor de Venta (Pesos)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(balance, crypto, index) in filteredBalances" :key="crypto"
                    :class="index % 2 === 0 ? 'row-even' : 'row-odd'">
                    <td>{{ crypto.toUpperCase() }}</td>
                    <td>{{ balance }}</td>
                    <td>${{ getCryptoValueInPesos(crypto, balance) }}</td>
                </tr>
            </tbody>
        </table>
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

<style scoped lang="scss"> 
.actual-state {
    padding: 0px 100px;
}

h2 {
    display: flex;
    align-items: center;
    justify-content: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    table-layout: fixed;
}

th,
td {
    padding: 8px;
    text-align: center;
}

th {
    background-color: $secondary-color;
    color: white;
}

tbody td:first-child {
    font-weight: bold;
}

.row-even {
    background-color: #f2f2f2;
}

.row-odd {
    background-color: #e0e0e0;
}

.row-total {
    background-color: $primary-color;
    color: white;
}

p {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>