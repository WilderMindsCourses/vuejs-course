import Vue from "vue";
import VueRouter from "vue-router";

import Customer from "./customer";
import Shipping from "./shipping";
import Confirmation from "./confirmation";
import ProductList from "./productList";
import Checkout from "./checkout";
import ProductInfo from "./productInfo";
import store from "./dataStore"

import "./waitcursor";
import "./filters";
import "./cart";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    component: ProductList
  },
  {
    path: "/checkout",
    component: Checkout,
    children: [
      { path: "customer", component: Customer },
      { path: "shipping", component: Shipping },
      { path: "confirmation", component: Confirmation }
    ]
  },
  {
    path: "/product/:code",
    component: ProductInfo,
    name: "productInfo",
    props: true
  }
];

new Vue({
  el: "#index-page", 
  store,
  router: new VueRouter({ routes })
});