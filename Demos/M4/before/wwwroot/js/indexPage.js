var vm = new Vue({
  el: "#index-page",
  data: {
    appName: "Product List",
    today: new Date(),
    error: "",
    products: [],
    isBusy: false
  },
  methods: {
    onBuy: function (product) {
      alert("Buying: " + product.name);
    },
    onSort: function (by) {
      this.products = _.sortBy(this.products, by);
    }
  },
  mounted: function () {
    // Call the API
    this.error = "";
    this.isBusy = true;
    axios.get("/api/products")
      .then(function (res) {
        this.products = res.data.results;
        this.isBusy = false;
      }.bind(this))
      .catch(function () {
        this.error = "Could not load products.";
        this.isBusy = false;
      }.bind(this));
  }

});