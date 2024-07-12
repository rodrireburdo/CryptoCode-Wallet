import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const useCryptoBalanceStore = defineStore('cryptoBalance', {
    state: () => ({
        balances: {
            btc: 0,
            dai: 0,
            eth: 0,
            usdt: 0,
            wld: 0,
        },
        loading: false,
        error: null,
    }),
    actions: {
        async fetchBalances(userName) {
            this.loading = true;
            this.error = null;
            try {
                const response = await apiClient.get(`/transactions?q={"user_id": "${userName}"}`);
                const transactions = response.data;

                this.balances.btc = 0;
                this.balances.dai = 0;
                this.balances.eth = 0;
                this.balances.usdt = 0;
                this.balances.wld = 0;

                transactions.forEach(transaction => {
                    if (transaction.action === 'purchase') {
                        this.balances[transaction.crypto_code] += parseFloat(transaction.crypto_amount);
                    } else if (transaction.action === 'sale') {
                        this.balances[transaction.crypto_code] -= parseFloat(transaction.crypto_amount);
                    }
                });
            } catch (error) {
                this.error = 'Error al obtener los balances de las criptomonedas.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        updateBalance(cryptoCode, amount, action) {
            if (action === 'purchase') {
                this.balances[cryptoCode] += parseFloat(amount);
            } else if (action === 'sale') {
                this.balances[cryptoCode] -= parseFloat(amount);
            }
        }
    },
});