<!-- src/components/ErrorModal.vue -->
<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <p>Hubo un error al guardar la transacción</p>
            <button @click="$emit('close')">Cerrar</button>
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
}
</style>