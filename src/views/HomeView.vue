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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    min-height: 100vh;
    background: linear-gradient(to bottom,$background-primary, $primary-color, $secondary-color);
}
</style>