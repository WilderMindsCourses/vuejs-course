import Vue from "vue";
import Router from "./router";

import store from "./dataStore"

import "./waitcursor";
import "./filters";
import "./cart";

new Vue({
  el: "#index-page", 
  store,
  router: Router
});