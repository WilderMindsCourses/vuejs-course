var productListComponent = {
  data: function () {
    return {
      appName: "Product List",
      today: new Date(),
      error: "",
      isBusy: false
    };
  },
  methods: {
    onBuy: function (product) {
      this.$store.commit("addToCart", product);
    },
    onSort: function (by) {
      this.products = _.sortBy(this.products, by);
    }
  },
  mounted: function () {
    // Call the API
    this.error = "";
    this.isBusy = true;
    this.$store.dispatch("loadCatalog")
      .then(function () {
        this.isBusy = false;
      }.bind(this))
      .catch(function () {
        this.error = "Could not load products.";
        this.isBusy = false;
      }.bind(this));
  },
  computed: {
    products: function () {
      return this.$store.state.theCatalog.catalog;
    }
  }

};

let ProductList = Vue.component("product-list", function (resolve, reject) {

  axios.get("/templates/productList.html")
    .then(function (res) {
      productListComponent.template = res.data;
      resolve(productListComponent);
    })
    .catch (function () { reject(); });

});










