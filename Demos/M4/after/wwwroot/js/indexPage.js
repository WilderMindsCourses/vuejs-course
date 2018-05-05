var vm = new Vue({
  el: "#index-page",
  data: {
    appName: "Product List",
    today: new Date(),
    error: "",
    products: [],
    cartItems: [],
    isBusy: false
  },
  methods: {
    onBuy: function (product) {
      let line = _.find(this.cartItems, { code: product.gtinCode });
      if (line) {
        line.quantity++;
      } else {
        this.cartItems.push({
          name: product.name,
          price: product.listPrice,
          quantity: 1,
          code: product.gtinCode
        });
      }
    },
    onSort: function (by) {
      this.products = _.sortBy(this.products, by);
    },
    onDeleteItem: function (line) {
      let index = _.findIndex(this.cartItems, { code: line.code });
      this.cartItems.splice(index, 1);
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
  },
  computed: {
    subtotal: function () {
      return _.sumBy(this.cartItems, function (c) { return c.price * c.quantity; })
    }
  }

});