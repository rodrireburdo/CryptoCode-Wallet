<template>
    <div class="container">
        <PresentationComponent/>
        <LoginForm/>
    </div>  
</template>

<script setup>
    import PresentationComponent from '../components/PresentationComponent.vue';
    import LoginForm from '@/components/LoginForm.vue';
</script>

<style scoped lang="scss">
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}
.container {
    display: grid;
    grid-template-rows: auto auto;
    min-height: 100dvh;
    align-items: center;
    background-image: radial-gradient(125% 125% at 50% 10%, #000000, #4623A3);
}
</style>