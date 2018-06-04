// app.js
import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

import ProductList from "./productList";
import Checkout from "./checkout";
import store from "./store";
import Cart from "./Cart";
import Login from "./login";

Vue.use(VueRouter);
Vue.use(VeeValidate);

let routes = [
  { path: "/", component: ProductList },
  {
    path: "/checkout",
    component: Checkout,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/login",
    component: Login
  }
];

let theRouter = new VueRouter({ routes });

theRouter.beforeEach(function (to, _from, next) {
  if (to.meta.authRequired) {
    if (store.getters.isAuthenticated == false) {
      next({ path: "/login" });
      return; // Prevent the main next() from being called
    }
  }
  next();
});

let vm = new Vue({
  el: "#index-view",
  store,
  components: {
    Cart
  },
  router: theRouter
});