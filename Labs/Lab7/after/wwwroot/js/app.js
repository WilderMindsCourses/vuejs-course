// app.js
import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

import ProductList from "./productList";
import Checkout from "./checkout";
import store from "./store";
import Cart from "./Cart";

Vue.use(VueRouter);
Vue.use(VeeValidate);

let routes = [
  { path: "/", component: ProductList },
  { path: "/checkout", component: Checkout }
];

var vm = new Vue({
  el: "#index-view",
  store,
  components: {
    Cart
  },
  router: new VueRouter({ routes })
});