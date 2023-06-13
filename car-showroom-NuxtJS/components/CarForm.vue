<template>
    <section>
        <vee-form class="modal" :validation-schema="schema" @submit="submitForm">
            <div class="modal-content">

                <h2 v-if="!openAddCarModel">Edit car</h2>
                <h2 v-else>Add car</h2>

                <div class="car-details">
                    <label for="name">Car Name: </label>
                    <vee-field type="text" id="car-name" name="name" placeholder="enter car name" v-model="carData.name" />
                    <ErrorMessage class="error-text" name="name" />

                    <label for="details">Car Description:</label>
                    <vee-field id="car-details" name="details" as="textarea" rows="4" cols="50"
                        placeholder="enter car description" v-model="carData.details">
                    </vee-field>

                    <ErrorMessage class="error-text" name="details" />

                    <label for="price">Car Price:</label>
                    <vee-field type="number" id="price" name="price" placeholder="enter car price"
                        v-model="carData.price" />
                    <ErrorMessage class="error-text" name="price" />

                    <label for="url">Car Image:</label>
                    <vee-field name="url" type="url" id="car-url" placeholder="enter Image URL" v-model="carData.image" />
                    <ErrorMessage class="error-text" name="url" />

                    <div class="button">
                        <button type="reset" class="reset" @click="closeForm">Cancel</button>

                        <button type="submit" class="submit">
                            {{ buttonName }}
                        </button>
                    </div>
                </div>
            </div>
        </vee-form>
    </section>
</template>


<script setup>
import { ref, defineEmits } from "vue";
import { ErrorMessage } from "vee-validate";
import { useCarStore } from "../stores/carStore";
import { reactive } from "vue";

const carStore = useCarStore();
const schema = {
    name: "required|max:20",
    details: "required|min:30|max:120",
    url: "required|url",
    price: "required",
};

const carData = reactive({
    name: props.editCar.name || "",
    price: props.editCar.price || "",
    image: props.editCar.image || "",
    details: props.editCar.details || "",
    id: props.editCar.id,
})

const props = defineProps(['openEditCarModel', 'openAddCarModel', 'editCar'])
const buttonName = ref(props.openAddCarModel ? "Submit" : "Update");

const emit = defineEmits(['onCancel'])
const closeForm = () => {
    emit('onCancel')
}

const submitForm = () => {
    if (props.openAddCarModel) {
        carStore.carsData();
        carStore.addCarFormData(carData);
    } else {
        carStore.editCarFormData(carData);
    }
};
</script>


<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    /* color: white; */
}

.car-details {
    display: grid;
}

.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
}

.modal-content {
    background-color: #c7c0ae47;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 20px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    color: black;
}

input[type="text"],
input[type="number"],
input[type="url"],
textarea {
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    color: black;
}

button[type="submit"] {
    background-color: #34d339;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    width: 30%;
    margin-right: 10%;
}

button[type="reset"] {
    background-color: rgb(220, 52, 52);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    width: 30%;
    margin-right: 10%;
}

.button {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    top: 3px;
}

h2 {
    color: black;
    text-align: center;
}

.error-text {
    color: rgb(219, 81, 81);
}

@media only screen and (max-width: 958px) and (min-width: 350px) {
    .modal-content {
        margin-top: 30%;
        width: 80%;
    }
}
</style>
