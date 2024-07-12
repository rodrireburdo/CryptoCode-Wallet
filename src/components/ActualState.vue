<template>
    <div>
        <h2>Cantidad de Criptomonedas</h2>
        <ul v-if="cryptoBalances.length > 0">
            <li v-for="(balance, index) in cryptoBalances" :key="index">
                {{ balance.crypto_code.toUpperCase() }}: {{ balance.amount }}
            </li>
        </ul>
        <p v-else>No tienes criptomonedas registradas.</p>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { useCryptoBalanceStore } from '@/stores/useCryptoBalanceStore';

const userStore = useUserStore();
const cryptoBalanceStore = useCryptoBalanceStore();

// Computed property to filter out cryptocurrencies with a balance of 0
const cryptoBalances = computed(() => {
    const balances = cryptoBalanceStore.balances;
    return Object.entries(balances)
        .filter(([, amount]) => amount > 0) // No se necesita `crypto_code`
        .map(([crypto_code, amount]) => ({
            crypto_code,
            amount
        }));
});

// Fetch balances when the component is mounted
onMounted(async () => {
    try {
        await cryptoBalanceStore.fetchBalances(userStore.userName);
    } catch (error) {
        console.error('Error al obtener los balances de criptomonedas:', error);
    }
});
</script>
