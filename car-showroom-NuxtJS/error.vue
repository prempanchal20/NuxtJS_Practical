<template>
    <section class="not-found-content">
        <div class="not-found-heading">
            <p>404 Not Found..!</p>
            <h4>{{ error.statusCode }}</h4>
            <h4>{{ error.message }}</h4>
            <button @click="handleError">Go Back</button>
        </div>
    </section>
</template>

<script setup>
const handleError = () => {
    navigateTo("/")
}

const error = useError();
</script>

<style >
.not-found-heading p {
    color: black;
    text-align: center;
    margin-top: 20%;
    font-size: 50px;
}
</style>

