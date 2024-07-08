import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userName: sessionStorage.getItem('userName') || '',
    }),
    actions: {
        setUserName(name) {
            this.userName = name;
            sessionStorage.setItem('userName', name);
        },
    },
});
