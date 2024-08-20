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
            this.startLoading();

            try {
                const transactions = await this.fetchTransactions(userName);
                this.resetBalances();
                this.processTransactions(transactions);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        updateBalance(cryptoCode, amount, action) {
            this.adjustBalance(cryptoCode, amount, action);
            this.preventNegativeBalance(cryptoCode);
        },
        startLoading() {
            this.loading = true;
            this.error = null;
        },

        async fetchTransactions(userName) {
            try {
                const response = await apiClient.get(`/transactions?q={"user_id": "${userName}"}`);
                return response.data;
            } catch (error) {
                throw new Error('Error al obtener las transacciones: ' + error.message);
            }
        },

        resetBalances() {
            // Reseteando los balances a 0 antes de procesar las transacciones
            this.balances.btc = 0;
            this.balances.dai = 0;
            this.balances.eth = 0;
            this.balances.usdt = 0;
            this.balances.wld = 0;
        },

        processTransactions(transactions) {
            transactions.forEach(transaction => {
                this.adjustBalance(transaction.crypto_code, transaction.crypto_amount, transaction.action);
            });
        },

        adjustBalance(cryptoCode, amount, action) {
            const parsedAmount = parseFloat(amount);

            if (action === 'purchase') {
                this.balances[cryptoCode] += parsedAmount;
            } else if (action === 'sale') {
                this.balances[cryptoCode] -= parsedAmount;
            }
        },

        preventNegativeBalance(cryptoCode) {
            if (this.balances[cryptoCode] < 0) {
                this.balances[cryptoCode] = 0;
            }
        },
    },
});