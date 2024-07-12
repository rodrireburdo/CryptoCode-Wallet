// src/stores/cryptoPrices.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCryptoPricesStore = defineStore('cryptoPrices', {
    state: () => ({
        prices: {
            btc: { bid: null, ask: null },
            dai: { bid: null, ask: null },
            eth: { bid: null, ask: null },
            usdt: { bid: null, ask: null },
            wld: { bid: null, ask: null },
        },
        loading: false,
        error: null,
    }),
    actions: {
        async fetchPrices() {
            this.loading = true;
            this.error = null;
            try {
                const [btc, dai, eth, usdt, wld] = await Promise.all([
                    axios.get('https://criptoya.com/api/argenbtc/btc/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/dai/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/eth/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/usdt/ars'),
                    axios.get('https://criptoya.com/api/argenbtc/wld/ars'),
                ]);

                this.prices.btc = { bid: btc.data.totalBid, ask: btc.data.totalAsk };
                this.prices.dai = { bid: dai.data.totalBid, ask: dai.data.totalAsk };
                this.prices.eth = { bid: eth.data.totalBid, ask: eth.data.totalAsk };
                this.prices.usdt = { bid: usdt.data.totalBid, ask: usdt.data.totalAsk };
                this.prices.wld = { bid: wld.data.totalBid, ask: wld.data.totalAsk };
            } catch (error) {
                this.error = 'Error al obtener los precios de las criptomonedas.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
