<template>
    <div class="welcome-section">
        <div class="div-logo">
            <img src="../assets/logo.png" class="img-logo" alt="Logo">
            <h1><strong class="text-1">Crypto</strong><strong class="text-2">Code</strong></h1>
        </div>
        <div class="div-presentation">
            <div class="img-container">
                <img src="../assets/billetera3.png" class="img-wallet img-wallet-1">
            </div>
            <h3>Tu plataforma para gestionar tus criptomonedas<br>con facilidad y confianza.</h3>
            <div class="img-container">
                <img src="../assets/billetera2.png" class="img-wallet img-wallet-2">
            </div>
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
    text-shadow: 
                -3px -3px 0 white,  
                3px -3px 0 white,
                -1px  3px 0 white,
                3px  3px 0  white;
}

.text-2 {
    color: $primary-color;
}

.text-1 {
    color: $secondary-color;
}

.img-logo {
    max-width: 250px;
    margin: 0;
    margin-top: 30px;
}

.img-wallet-1 {
    position: absolute;
    width: 250px;
    max-width: none;
    top: 0px;
    left: 20px;
}

.img-wallet-2 {
    position: absolute;
    width: 225px;
    max-width: none;
    bottom: 0px;
    right: 20px;
}

.div-presentation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
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
}

.welcome-section h3 {
    font-size: 30px;
    margin-bottom: 20px;
    margin-right: 20px;
    color: white;
}
</style>