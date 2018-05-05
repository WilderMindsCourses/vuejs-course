Vue.use(VeeValidate);

var vm = new Vue({
  el: "#checkout",
  data: {
    error: "",
    isBusy: false,
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
            this.isBusy = true;
            axios.post("/api/customer", this.customer)
              .then(function () {
                this.isBusy = false;
                alert("saved the data");
              }.bind(this))
              .catch(function () {
                this.isBusy = false;
                this.error = "Failed to save customer";
              }.bind(this));
          }
        }.bind(this));
    }
  }
});