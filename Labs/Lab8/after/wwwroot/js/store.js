// store.js
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    token: "",
    expiration: new Date()
  },
  mutations: {
    setProducts: function (state, newCatalog) {
      state.products = newCatalog;
    },
    addProductToCart: function(state, product) {
      state.cart.push(product);
    },
    clearCart: function (state) {
      state.cart = [];
    },
    setToken(state, tokenInfo) {
      state.token = tokenInfo.token;
      state.expiration = new Date(tokenInfo.expiration);
    }
  },
  actions: {
    loadCatalog: function (context) {
      return new Promise(function (resolve, reject) {
        axios.get("/api/products")
          .then(function (res) {
            context.commit("setProducts", res.data.results);
            resolve();
          })
          .catch(function () {
            reject();
          });
      });
    },
    doAuth(context, creds) {
      return new Promise(function (resolve, reject) {
        axios.post("/api/account/createtoken", creds)
          .then((res) => {
            context.commit("setToken", res.data);
            resolve();
          })
          .catch(() => reject());
      });
    }
  },
  getters: {
    isAuthenticated: (state) => state.token && state.expiration > new Date()
  }
});