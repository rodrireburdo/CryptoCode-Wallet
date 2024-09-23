<template>
    <div class="container">
        <HeaderApp/>
        <NavApp/>
        <HistoryComponent/>
        <FooterApp/>
    </div>
</template>

<script setup>
    import HeaderApp from '../components/HeaderApp.vue'
    import NavApp from '@/components/NavApp.vue';
    import HistoryComponent from '@/components/HistoryComponent.vue';
    import FooterApp from '../components/FooterApp.vue';
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    min-height: 100vh;
}
</style>