<template>
    <div class="welcome-section">
        <div class="div-logo">
            <img src="../assets/logo.png" class="img-logo" alt="Logo">
            <h1><strong class="text-1">Crypto</strong><strong class="text-2">Code</strong></h1>
        </div>
        <div class="div-presentation">
            <img src="../assets/billetera.png" class="img-wallet">
            <h3>Tu plataforma para gestionar tus criptomonedas<br>con facilidad y confianza.</h3>
            <img src="../assets/billetera.png" class="img-wallet">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

h1 {
    font-family: "Bevan", serif;
    font-weight: 400;
    font-size: 40px;
    margin: 0;
}

.text-2 {
    color: $primary-color;
}

.text-1 {
    color: $secondary-color;
}
.img-logo {
    max-width: 200px;
    margin: 0;
}
.img-wallet {
    max-width: 200px;
}
.div-presentation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: $primary-color;
}

.div-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.welcome-section {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: $background-primary;
}

.welcome-section h3 {
    font-size: 23px;
    margin-bottom: 20px;
    margin-right: 20px;
    color: white;
}

</style>