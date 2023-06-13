<template>
  <section class="navbar">
    <div class="navbar-logo">
      <div class="button-home">
        <button>Car Showroom</button>
      </div>

      <div class="nav-menu">
        <div class="navbar-links">
          <div class="user-name">
            <img src="../public/assets/account.png" alt="user-icon" v-if="userValid">
            <h3 v-if="userValid">Welcome, <b>{{ userData.name }}</b></h3>
          </div>

          <NuxtLink v-if="userValid" class="home" to="/">Home</NuxtLink>
          <NuxtLink v-else class="login" to="/login">Login</NuxtLink>
          <button v-if="userValid" @click="logoutBtn" class="logout-btn">Logout</button>
          <NuxtLink v-else class="register" to="/register">Register</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { userValid, userData } = storeToRefs(userStore)
console.log(userData.name);

const logoutBtn = () => {
  const response = userStore.logout()
  if (response === true) {
    router.push("/login");
  }
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

.navbar {
  position: sticky;
  top: 0;
  background-color: #001f3f;
  z-index: 1;
}

.navbar-logo {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  justify-content: space-between;
}

.navbar-logo button {
  border: none;
  background-color: transparent;
  color: #F8F8F8;
  font-size: 25px;
  font-weight: 600;
}

.navbar-links {
  display: flex;
  justify-content: flex-end;
}

.user-name {
  display: flex;
}

.navbar-links button {
  font-size: 20px;
  color: white;
  padding-left: 30px;
  font-weight: 100;
  cursor: pointer;
}

.home,
.login,
.register {
  border: none;
  background-color: transparent;
  font-size: 20px;
  color: white;
  padding-left: 30px;
}

.navbar-links h3 {
  color: white;
  font-weight: 100;
  margin-left: 10px;
  font-size: 20px;
}

.bi-person,
.bi-envelope,
.bi-key {
  margin-right: 10px;
  color: #001f3f;
}

.user-data-list {
  position: absolute;
  top: 100%;
  right: 11%;
  display: none;
  background-color: white;
  padding: 10px;
  list-style-type: none;
}

.user-name .user-data-list {
  display: block;
}

.user-data-list li {
  margin-top: 10px;
}

.bi-chevron-down {
  font-size: 15px;
  margin-left: 5px;
}

@media only screen and (max-width: 950px) {

  .button-home {
    width: 40%;
  }

  .navbar-logo {
    padding: 3%;
  }

  .navbar-logo button {
    font-size: 20px;
  }

  .home,
  .login,
  .register,
  .logout-btn {
    font-size: 16px;
  }

  .navbar-links button {
    font-size: 16px;
  }

  .user-name {
    font-size: 14px;
  }

}
</style>
