<template>
    <div class="loading-message">
        <p>Cargando...</p>
        <img src="@/assets/Loading.gif" alt="Cargando..." class="GifLoading">
    </div>
</template>

<script setup>

</script>

<style scoped>
.loading-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;
    color: #555;
}

.GifLoading {
    width: 150px;
    margin-top: 10px;
}
</style>