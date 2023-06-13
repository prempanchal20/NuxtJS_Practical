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
    //---------- Axios API - Register User-------------//
    async registerUser(userData) {
      try {
        const response = await axios.post(this.userURL, userData);
        if (response.status === 201) {
          alert(`User ${userData.name} Registered Successfully `);
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

            localStorage.setItem("userValid", true);
            localStorage.setItem("userData", JSON.stringify(checkUserData));

            // Backup Login Credentials incase above API does not work
            // try {
            //   const response = await axios.post("https://reqres.in/api/login", {
            //     email: "eve.holt@reqres.in",
            //     password: "cityslicka",
            //   });

            //   this.userValid = true;
            //   localStorage.setItem("token", response.data.token);
            //   localStorage.setItem("loggedIn", true);

            //   return response.data;
            // } catch (error) {
            //   localStorage.setItem(
            //     "token",
            //     `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
            //   );
            //   localStorage.setItem("loggedIn", true);
            // }
            return true;
          }
        }
      } catch (error) {
        error;
      }
    },
  },
});
