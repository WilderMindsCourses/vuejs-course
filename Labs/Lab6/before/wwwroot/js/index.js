// index.js
new Vue({
  el: "#index-view",
  store,
  data: {
    appName: "Product List",
    error: ""
  },
  mounted: function () {
    this.error = "";
    this.$store.dispatch("loadCatalog")
      .catch(function () { this.error = "Could not load catalog." });
  },
  methods: {
    onBuy: function (product) {
      this.$store.commit("addProductToCart", product);
    },
    onEmptyCart: function () {
      this.$store.commit("clearCart");
    }
  }
});