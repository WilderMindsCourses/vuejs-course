// index.js
new Vue({
  el: "#index-view",
  data: {
    appName: "Product List",
    buyCount: 0,
    products: [],
    error: ""
  },
  mounted: function () {
    this.error = "";
    axios.get("/api/products")
      .then(function (res) {
        this.products = res.data.results;
      }.bind(this))
      .catch(function () {
        this.error = "Failed to load products";
      }.bind(this));
  },
  methods: {
    onBuy: function (product) {
      this.buyCount++;
    }
  }
});