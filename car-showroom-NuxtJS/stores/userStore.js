import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userValid: useLocalStorage("userValid", false),
      userURL: import.meta.env.VITE_USER_API,
      userData: useLocalStorage("userData") || "",
    };
  },

  actions: {
    //---------- useFetch Method - Register User-------------//
    async registerUser(userData) {
      try {
        const response = await $fetch(this.userURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response) {
          alert(`User ${userData.name} Registered Successfully`);
        }
        return response;
      } catch (error) {
        alert("User is not Register... Please try Again");
      }
    },

    logout() {
      try {
        const logoutAlert = window.confirm(`Are You Sure Want to Logout..?`);
        if (logoutAlert === true) {
          this.userValid = false;
          localStorage.setItem("loggedIn", false);
          return logoutAlert;
        }
      } catch (error) {
        alert("User Is Not Logout Successfully... Please try Again..!!");
      }
    },

    // GET User method - Axios API
    async checkUser(loginUserData) {
      try {
        const response = await axios.get(this.userURL);
        const data = await response.data.data;

        if (response.status == 200) {
          const checkUserData = data.find(
            (udata) =>
              udata.email == loginUserData.email &&
              udata.password == loginUserData.password
          );

          if (!checkUserData) {
            alert("Invalid Credentials..!!");
            return false;
          } else {
            alert(`Login Successfully..!!`);
            this.userValid = true;
            this.userData = checkUserData;
            return true;
          }
        }
      } catch (error) {
        error;
      }
    },
  },
});
