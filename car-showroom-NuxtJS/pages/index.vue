<template>
    <section class="cars-data">
        <ul class="menu">
            <li><button @click="addCarBtn">Add Car</button></li>
        </ul>
        <GalleryCard @editData="editForm" />

        <CarForm v-if="openEditCarModel" :openEditCarModel="openEditCarModel" :openAddCarModel="openAddCarModel"
            :editCar="editDataItem" @onCancel="onCancel" />
    </section>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import CarForm from '../components/CarForm.vue';
import GalleryCard from '../components/GalleryCard.vue';
import { useCarStore } from '../stores/carStore';

const carStore = useCarStore();
const { openAddCarModel, openEditCarModel } = toRefs(carStore);
let editDataItem = reactive({})

const editForm = (item) => {
    openEditCarModel.value = true;
    openAddCarModel.value = false;
    editDataItem = item
};

const addCarBtn = () => {
    editDataItem = ""
    openEditCarModel.value = true;
    openAddCarModel.value = true;
};

const onCancel = () => {
    openAddCarModel.value = false;
    openEditCarModel.value = false;
};

useHead({
    title: 'Car Showroom'
})
</script>


/details/:carID