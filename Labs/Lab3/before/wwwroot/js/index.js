// index.js
new Vue({
  el: "#index-view",
  data: {
    appName: "Product List",
    buyCount: 0,
    products: [{
      name: "The first product",
      listPrice: 12.99,
      description: "This is the first product."
    }, {
      name: "The second product",
      listPrice: 15,
      description: "This is the 2nd product."
    }, {
      name: "The last product",
      listPrice: 9.99,
      description: "This is the final product."
    }]
  },
  methods: {
    onBuy: function (product) {
      this.buyCount++;
    }
  }
});