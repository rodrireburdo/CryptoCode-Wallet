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

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
}
</style>