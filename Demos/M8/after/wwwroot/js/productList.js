import Vue from "vue";
import axios from "axios";
import _ from "lodash";

var productListComponent = {
  data() {
    return {
      appName: "Product List",
      today: new Date(),
      error: "",
      isBusy: false
    };
  },
  methods: {
    onBuy(product) {
      this.$store.commit("addToCart", product);
    },
    onSort(by) {
      this.products = _.sortBy(this.products, by);
    }
  },
  mounted() {
    // Call the API
    this.error = "";
    this.isBusy = true;
    this.$store.dispatch("loadCatalog")
      .then(() => this.isBusy = false )
      .catch(() => {
        this.error = "Could not load products.";
        this.isBusy = false;
      });
  },
  computed: {
    products() {
      return this.$store.state.theCatalog.catalog;
    }
  }

};

export default Vue.component("product-list", function (resolve, reject) {

  axios.get("/templates/productList.html")
    .then(function (res) {
      productListComponent.template = res.data;
      resolve(productListComponent);
    })
    .catch (function () { reject(); });

});










