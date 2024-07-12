<template>
    <div class="welcome-section">
        <div class="div-logo">
            <img src="../assets/logo.png" class="img-logo" alt="Logo">
            <h3>Bienvenido a CriptoCode</h3>
        </div>
        <h4>Tu plataforma para gestionar tus criptomonedas con facilidad y confianza.</h4>
        <p>Donde tu seguridad y comodidad son nuestra prioridad</p>
    </div>
</template>

<script setup>

</script>

<style scoped>
.img-logo {
    max-width: 200px;
}

.div-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;;
}
.welcome-section {
    text-align: center;
    margin-bottom: 10px;
}

.welcome-section h3 {
    font-size: 2em;
    margin-bottom: 10px;
    color: #333;
}

.welcome-section h4 {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #555;
}

.welcome-section p {
    font-size: 1.2em;
    color: #777;
}
</style>