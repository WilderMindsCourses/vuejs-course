import Vue from "vue";
import VueRouter from "vue-router";
import store from "./dataStore";

import Customer from "./customer";
import Shipping from "./shipping";
import Confirmation from "./confirmation";
import ProductList from "./productList";
import Checkout from "./checkout";
import ProductInfo from "./productInfo";
import CustomerInfo from "./customerInfo";
import Login from "./login";

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
  },
  {
    path: "/customerInfo",
    component: CustomerInfo,
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
      store.commit("setRedirect", to.path);
      next({ path: "/login" });
      return;
    }
  } 

  next();
});

export default theRouter;