<template>
    <section>
        <div v-show="loading" class="loader">
            <img src="../public/assets/loader.gif" alt="loader" />
        </div>

        <div class="no-car-image" v-if="showData.length === 0">
            <img src="../public/assets/no-car.png" alt="no-car image" />
        </div>
        <div class="car-content" v-if="!loading">
            <TransitionGroup name="car" />
            <div v-for="item in  showData " :key="item.id">
                <div class="car-card">
                    <div class="car-box">
                        <div class="car-container">
                            <div class="car-images">
                                <nuxt-img :src="item.image" alt="car - image" />
                            </div>

                            <div class="car-name">
                                <h3>{{ item.name }}</h3>
                            </div>

                            <div class="description">
                                <p>{{ truncatedDescription(item.details) }}</p>
                            </div>

                            <div class="buttons-icon">
                                <div class="edit-icon">
                                    <nuxt-img src="../public/assets/edit.png" id="edit-icon" @click.prevent="editForm(item)"
                                        alt="edit-icon" />
                                </div>

                                <div class="info-button">
                                    <NuxtLink :to="`/details/${item.id}`" class="info-btn">{{ $t("info") }}</NuxtLink>
                                </div>

                                <div class="delete-icon">
                                    <nuxt-img src="../public/assets/delete.png" alt="delete-icon" id="delete-icon"
                                        @click.prevent="deleteData(item.id, item.name)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TransitionGroup />
        </div>
    </section>
</template>

<script setup>
import { useCarStore } from "../stores/carStore";
import { onMounted, defineEmits, ref } from "vue";
import { storeToRefs } from "pinia";

const carStore = useCarStore();
const { showData } = storeToRefs(carStore);
const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
    carStore.carsData();
});

const truncatedDescription = (details) => {
    let maxLength = 50;
    if (typeof details === "string" && details.length > maxLength) {
        return details.slice(0, maxLength) + "...";
    } else {
        return details;
    }
};

const emit = defineEmits(["editData"]);
const editForm = (item) => {
    emit("editData", item);
};

const deleteData = (itemID, itemName) => {
    carStore.deleteData(itemID, itemName);
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #f8f8f8;
}

.car-card {
    position: relative;
    min-width: 320px;
    height: 440px;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 5px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    margin: 20% 20px;
}

.cars-data {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.car-box {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.car-container {
    text-align: center;
    width: 100%;
    overflow: hidden;
}

.car-container h2 {
    position: absolute;
    top: -10px;
    right: 30px;
    font-size: 8em;
    color: rgba(255, 255, 255, 0.05);
}

.car-container h3 {
    font-size: 1.8em;
    color: rgba(255, 255, 255, 0.5);
    z-index: 1;
}

.car-container p {
    font-size: 16px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.5);
}

.card:hover h3,
.card:hover p {
    color: rgba(255, 255, 255, 1);
}

.info-btn {
    padding: 8px 40px;
    background: #e91e63;
    margin-top: 15px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
}

.car-images img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.car-images {
    height: 50%;
}

.car-name {
    height: 25%;
    padding: 6%;
}

.car-name h3,
.description p {
    color: #001f3f;
}

.car-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.buttons-icon {
    display: flex;
    justify-content: space-around;
    margin-top: 10%;
}

.card-button {
    cursor: pointer;
}

.info-btn a {
    font-size: 15px;
}

.button {
    position: relative;
    top: 1px;
    cursor: pointer;
}

.description {
    height: 10%;
    width: 100%;
}

.icons {
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: 50px;
}

#edit-icon,
#delete-icon {
    background-color: transparent;
    font-size: 20px;
    color: #001f3f;
    border: none;
    cursor: pointer;
}

.menu {
    position: absolute;
    right: 10px;
    display: flex;
}

.menu button {
    border: 1px solid #001f3f;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 15px;
    margin-right: 15px;
    margin-top: 20px;
}

.car-enter-active,
.car-leave-active {
    transition: all 0.4s ease-in;
}

.car-enter-from,
.car-leave-to {
    opacity: 1;
    transform: translateY(100px);
}

.no-car-image {
    margin-top: 45%;
}

.loader {
    display: flex;
    justify-content: center;
    margin-top: 10%;
}

.loader img {
    width: 30%;
}

#locale-select {
    border: 1px solid #001f3f;
    border-radius: 5px;
}

@media only screen and (max-width: 958px) and (min-width: 350px) {
    .loader img {
        margin-top: 30%;
        width: 80%;
    }
}
</style>