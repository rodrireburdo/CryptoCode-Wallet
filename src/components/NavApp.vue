<template>
    <nav class="nav">
        <ul>
            <li><router-link to="/initial">Inicio</router-link></li>
            <li><router-link to="/buy-crypto">Comprar Cripto</router-link></li>
            <li><router-link to="/sell-crypto">Vender Cripto</router-link></li>
            <li><router-link to="/history">Historial</router-link></li>
        </ul>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.nav {
    background-color: #333;
    padding: 1rem;
}

.nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
}

.nav li {
    margin: 0;
}

.nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    display: block;
}

.nav a:hover {
    background-color: #555;
}
</style>