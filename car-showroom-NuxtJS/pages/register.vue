<template>
    <section class="register-form">
        <div class="register-form-title">
            <h2>Registration Form</h2>
        </div>

        <vee-form id="register-form-details" :validation-schema="registerSchema" @submit="registerUserData">

            <label for="text">Name*:</label>
            <vee-field type="name" id="name" name="name" placeholder="Enter your name" v-model="userData.name" />
            <ErrorMessage class="error-text" name="name" />

            <label for="email">Email*:</label>
            <vee-field type="email" id="email" name="email" placeholder="Enter your mail id" v-model="userData.email" />
            <ErrorMessage class="error-text" name="email" />

            <label for="password">Password*:</label>
            <vee-field type="password" id="password" name="password" placeholder="Enter your password"
                v-model="userData.password" />
            <ErrorMessage class="error-text" name="password" />

            <label for="password">Confirm Password*:</label>
            <vee-field type="password" name="confirmation" placeholder="Confirm your password" />
            <ErrorMessage class="error-text" name="confirmation" />

            <label for="role">Role*:</label>
            <vee-field as="select" id="role" name="role" v-model="userData.role">
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
            </vee-field>
            <ErrorMessage class="error-text" name="role" />

            <div class="gender">
                <label class="gender">Gender*:</label>
                <div class="male-female">
                    <label for="male">
                        <vee-field type="radio" id="male" name="gender" value="male" v-model="userData.gender" />Male
                    </label>
                    <label for="female">
                        <vee-field type="radio" id="female" name="gender" value="female" />Female
                    </label>
                </div>
            </div>
            <ErrorMessage class="error-text" name="gender" />

            <label for="dob">Date of Birth*:</label>
            <vee-field type="date" id="dob" name="dob" v-model="userData.dob" :max="getCurrentDate()" @change="userAge" />
            <ErrorMessage class="error-text" name="dob" />

            <label for="age">Age*:</label>
            <vee-field type="number" id="age" name="age" placeholder="Enter your Age" v-model="userData.age" />
            <ErrorMessage class="error-text" name="age" />
            <div class="required-field">* indicates that Field are required</div>

            <div class="buttons">
                <v-btn color="success" class="register-btn" type="submit">Register</v-btn>
            </div>
            <div class="redirect">
                <p>Already User Then <a href="/login">Login</a> Here</p>
            </div>
        </vee-form>
    </section>
</template>

<script setup>
import { ErrorMessage } from "vee-validate";
import { useUserStore } from "../stores/userStore";
import { reactive } from 'vue';

const userStore = useUserStore();
const { registerUser } = userStore;

const registerSchema = reactive({
    name: "required",
    email: "required|email",
    password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
    confirmation: "required|confirmed:@password",
    role: "required",
    gender: "required",
    age: "required|min_value:1|age",
    dob: "required"
});

const userData = reactive({
    initialValues: {
        name: "",
        email: "",
        password: "",
        confirmation: "",
        role: "",
        gender: "",
        age: null,
        dob: "",
    },
    validationSchema: registerSchema,
    validateOnMount: false,
})

const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
}

const userAge = (e) => {
    let date = new Date(e.target.value);
    let month_diff = Date.now() - date.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    userData.age = age;
};

const registerUserData = async () => {
    const response = await registerUser(userData)
    if (response) {
        navigateTo({ path: '/login' })
    }
}

useHead({
    title: 'Car Showroom - Register'
})
</script>

<style scoped>
.register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 5%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}


h2 {
    text-align: center;
    color: #001f3f;
    margin-bottom: 5%;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="name"],
input[type="email"],
input[type="password"],
select,
input[type="number"],
input[type="date"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type="radio"] {
    margin-right: 5px;
}

.register-btn {
    border: none;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    float: right;
    width: 50%;
}


.gender {
    display: flex;
    flex-direction: row;
}

.male-female {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin-left: 10px;
}

.buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

#register-form-details {
    color: #001f3f;
}

.error-text {
    color: rgb(219, 81, 81);
}

.required-field {
    font-size: 15px;
}

.redirect {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

/* Responsive Styles */
@media (max-width: 500px) {
    .container {
        max-width: 80%;
    }

    .register-form {
        margin-top: 20%;
    }
}
</style>