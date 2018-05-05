Vue.use(VeeValidate);

var vm = new Vue({
  el: "#checkout",
  data: {
    error: "",
    customer: {
      name: "",
      phone: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        cityTown: "",
        stateProvince: "",
        postalCode: "",
        country: ""
      }
    }
  },
  methods: {
    onSave: function () {
      this.$validator.validateAll()
        .then(function (result) {
          if (result) {
            this.error = "";
            axios.post("/api/customer", this.customer)
              .then(function () {
                alert("saved the data");
              })
              .catch(function () {
                this.error = "Failed to save customer";
              }.bind(this));
          }
        }.bind(this));
    }
  }
});