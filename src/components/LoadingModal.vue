<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <p>Cargando...</p>
            <img src="@/assets/Loading.gif" alt="Cargando..." class="loading-gif">
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.loading-gif {
    width: 100px;
    margin-top: 10px;
}
</style>