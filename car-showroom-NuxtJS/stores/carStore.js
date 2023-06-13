import { defineStore } from "pinia";
import axios from "axios";

const useCarStore = defineStore("api", {
  state: () => {
    return {
      showData: [],
      carDetail: [],
      getCarsData: [],
      deleteData: true,
      openAddCarModel: true,
      openEditCarModel: false,
      carURL: import.meta.env.VITE_CAR_API,
    };
  },

  getters: {
    getShowData(state) {
      return state.showData;
    },

    getCarDetail(state) {
      return state.carDetail;
    },
  },

  actions: {
    //----------------Axios APIs - GET, Post, Put, Delete----------------//

    // GET Method - Axios API
    carsData() {
      axios
        .get(this.carURL)
        .then((response) => {
          this.showData = response.data.data;
        })
        .catch(() => alert("Couldn't Show The Data... Please try Again"));
    },

    // GET Method by ID - Axios API
    getCarbyID(carID) {
      axios
        .get(`${this.carURL}/${carID}`)

        .then((response) => {
          this.carDetail = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },

    // Post Method - Axios API
    addCarFormData(carData) {
      axios
        .post(this.carURL, carData)
        .then(() => {
          alert(`"Created Data"\n
        "Car Name is-" ${carData.name}, 
        "Car Description is- " ${carData.details}, 
        "Car Price is- " ${carData.price}, 
        "Car URL is- " ${carData.image}`);
          this.carsData();
          this.openAddCarModel = false;
          this.openEditCarModel = false;
        })

        .catch(() => {
          alert("Couldn't Add The Car... Please try Again");
        });
    },

    // Put Method - Axios API
    editCarFormData(carData) {
      axios
        .put(`${this.carURL}/${carData.id}`, {
          name: carData.name,
          price: carData.price,
          image: carData.image,
          details: carData.details,
        })
        .then(() => {
          alert(`"Edited Data"\n
              "Car Name is-" ${carData.name}, 
              "Car Description is- " ${carData.details}, 
              "Car Price is- " ${carData.price}, 
              "Car URL is- " ${carData.image}`);
          this.carsData();
          this.openEditCarModel = false;
        })
        .catch(() => {
          alert("Couldn't Edit the Data... Please try Again");
        });
    },

    // DELETE Method - Axios API
    deleteData(itemId, itemName) {
      const deleteAlert = window.confirm(
        `Are You Sure Want to Delete ${itemName}`
      );

      if (deleteAlert == true) {
        axios
          .delete(`${this.carURL} / ${itemId}`)
          .then(() => {
            this.carsData();
          })
          .catch(() => {
            alert("Couldn't Delete The Data... Please try Again");
          });
      }
    },
  },
});
export { useCarStore };
