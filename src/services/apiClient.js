import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://laboratorio-36cf.restdb.io/rest/',
    headers: {
        'x-apikey': '64a5ccf686d8c5d256ed8fce'
    }
});

export const getUserTransactions = async (userId) => {
    try {
        const response = await apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        throw error;
    }
};

export const getCryptoPrice = async (exchange, crypto) => {
    try {
        const response = await axios.get(`https://criptoya.com/api/${exchange}/${crypto}/ars`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching price for ${crypto} from ${exchange}:`, error);
        throw error;
    }
};

export default apiClient;
