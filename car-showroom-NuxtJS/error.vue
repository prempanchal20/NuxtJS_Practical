<template>
    <section class="not-found-content">
        <div class="not-found-image">
            <img src="./public/assets/error.jpg" alt="404 Page Not Found Image">
        </div>
        <div class="go-back-btn">
            <button @click="handleError">Go Back</button>
        </div>
    </section>
</template>

<script setup>
const handleError = () => {
    navigateTo("/")
}   
</script>

<style scoped>
* {
    background-color: #2B323C;
}


.not-found-image {
    display: flex;
    justify-content: center;
}

.go-back-btn {
    text-align: center;
    border-radius: 10px;
}

.go-back-btn button {
    background-color: transparent;
    font-size: 30px;
    color: white;
    border-radius: 15px;
    padding: 3px 10px;
    border: solid 1px #D9E2F7;
}
</style>

