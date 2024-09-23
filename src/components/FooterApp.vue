<template>
    <footer class="footer">
        <p>
            © 2024 <a href="https://porfolio-eta-pink.vercel.app/">Rodrigo Reburdo</a> Casi todos los derechos reservados.
        </p>
    </footer>
</template>

<script setup></script>

<style scoped lang="scss">
.footer {
    background-color: $background-primary;
    padding: 20px;
    text-align: center;
    color: rgba(0, 0, 0, 0.455);
    width: 100%;

    p {
        margin: 0;
        font-size: 14px;

        a {
            color: #063d54be;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>