<template>
    <section>
        <div class="login-form">
            <div class="login-form-title">
                <h2>Login Form</h2>
            </div>

            <vee-form id="login-form-details" :validation-schema="loginSchema" @submit="user">
                <label for="email">Email*:</label>
                <vee-field type="email" id="email" name="email" placeholder="Enter your mail id"
                    v-model="loginUserData.email" />
                <ErrorMessage class="error-text" name="email" />

                <label for="password">Password*:</label>

                <vee-field type="password" id="password" name="password" placeholder="Enter your password"
                    v-model="loginUserData.password" />
                <ErrorMessage class="error-text" name="password" />

                <div class="required-field">* indicates that field are required</div>
                <div class="buttons">
                    <button type="submit" class="login-btn">
                        Login
                    </button>
                </div>
            </vee-form>
        </div>
        <div class="redirect">
            <p>New User Then <a href="/register">Register</a> Here</p>
        </div>
    </section>
</template>


<script setup>
import { ErrorMessage } from "vee-validate";
import { useUserStore } from "../stores/userStore";
import { reactive } from 'vue';

const userStore = useUserStore();
const { checkUser } = userStore;

const loginSchema = reactive({
    email: "required|email",
    password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
});

const loginUserData = reactive({
    loginUserData: {},
})

const user = async () => {
    const response = await checkUser(loginUserData);
    if (response) {
        navigateTo({ path: '/' })
    }
}

useHead({
    title: 'Car Showroom - Login'
})
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 5%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    border-radius: 15px;
}

h2 {
    text-align: center;
    color: #001f3f;
}

label {
    display: block;
    margin-bottom: 10px;
}

input[type="email"],
input[type="password"] {
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

.login-btn {
    border: none;
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    width: 50%;
    padding: 10px 20px;
    border-radius: 10px;
}

.cancel-btn {
    border: none;
    background-color: rgb(219, 81, 81);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    float: left;
}

.buttons {
    display: flex;
    justify-content: center;
    margin: 2%;
}

#login-form-details {
    color: #001f3f;
    margin-top: 20px;
}

.error-text {
    color: rgb(219, 81, 81);
}

.redirect {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.required-field {
    text-align: end;
}

/* Responsive Styles */
@media (max-width: 500px) {
    .container {
        max-width: 100%;
    }

    .login-form {
        margin-top: 20%;
    }
}
</style>
