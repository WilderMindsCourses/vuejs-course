// productList.js
let ProductList = Vue.component("product-list", {
  template: `<div>
  <h2>{{ appName }}</h2>
  <div>Purchased: {{ $store.state.cart.length }}</div>
  <div class="row">
    <div class="col-md-8">
      <div v-for="p in $store.state.products">
        <div>{{ p.name }}</div>
        <div>{{ p.description }}</div>
        <div>{{ p.listPrice }}</div>
        <button class="btn btn-info" v-on:click="onBuy(p)">Buy</button>
        <hr />
      </div>
    </div>
    <div class="col-md-4">
      <the-cart v-bind:items="$store.state.cart" v-on:empty-cart="onEmptyCart()"></the-cart>
    </div>
  </div>
</div>`,
  data: function () {
    return {
      appName: "Product List",
      error: ""
    };
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