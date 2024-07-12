import { createRouter, createWebHistory } from 'vue-router';
import InitialView from '@/views/InitialView.vue';
import HomeView from '@/views/HomeView.vue';
import BuyCryptoView from '@/views/BuyCryptoView.vue';
import SellCryptoView from '@/views/SellCryptoView.vue';
import HistoryView from '@/views/HistoryView.vue';
import TransactionEditView from '@/views/TransactionEditView.vue'; 
import TransactionDetailView from '@/views/TransactionDetailView.vue'; 

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/initial',
    name: 'InitialView',
    component: InitialView,
  },
  {
    path: '/buy-crypto',
    name: 'BuyCryptoView',
    component: BuyCryptoView,
  },
  {
    path: '/sell-crypto',
    name: 'SellCryptoView',
    component: SellCryptoView,
  },
  {
    path: '/history',
    name: 'HistoryView',
    component: HistoryView,
  },
  { path: '/transaction/:id/edit', 
    name: 'TransactionEdit', 
    component: TransactionEditView 
  },
  { path: '/transaction/:id', 
    name: 'TransactionDetail', 
    component: TransactionDetailView 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

