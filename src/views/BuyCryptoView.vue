<template>
    <div class="container">
        <HeaderApp/>
        <NavApp/>
        <buyComponent/>
        <FooterApp/>
    </div>
</template>

<script setup>
    import HeaderApp from '../components/HeaderApp.vue'
    import NavApp from '@/components/NavApp.vue';
    import buyComponent from '@/components/BuyComponent.vue';
    import FooterApp from '../components/FooterApp.vue';
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    min-height: 100vh;
}
</style>