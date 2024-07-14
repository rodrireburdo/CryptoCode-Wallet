<template>
    <div class="crypto-prices">
        <div class="crypto-list">
            <div v-for="(price, crypto) in prices" :key="crypto" class="crypto-item">
                <img :src="getImageUrl(crypto)" :alt="crypto" class="crypto-image" />
                <div class="crypto-info">
                    <p>Venta: {{ price.ask }} ARS</p>
                    <p>Compra: {{ price.bid }} ARS</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCryptoPricesStore } from '@/stores/useCryptoPricesStore';

const cryptoPricesStore = useCryptoPricesStore();
const { prices, fetchPrices } = cryptoPricesStore;

onMounted(async () => {
    await fetchPrices();
});

const getImageUrl = (crypto) => {
    return require(`@/assets/images_logo/${crypto}.png`);
};
</script>

<style scoped>

.crypto-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px 5px 20px;
    gap: 40px;
}
.crypto-prices {
    text-align: center;
}

.crypto-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.crypto-image {
    width: 50px;
    height: 50px;
    margin-right: 20px;
}

.crypto-info {
    text-align: left;
}

.crypto-info p {
    margin: 5px 0;
}
</style>