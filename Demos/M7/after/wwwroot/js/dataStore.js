import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import axios from "axios";

Vue.use(Vuex);

let catalog = {
  strict: true,
  state: {
    catalog: [],
    cart: []
  },
  mutations: {
    setCatalog: function (state, newCatalog) {
      state.catalog = newCatalog;
    },
    addToCart: function (state, product) {
      let line = _.find(state.cart, { code: product.gtinCode });
      if (line) {
        line.quantity++;
      } else {
        state.cart.push({
          name: product.name,
          price: product.listPrice,
          quantity: 1,
          code: product.gtinCode
        });
      }
    },
    deleteCartItem: function (state, line) {
      let index = _.findIndex(state.cart, { code: line.code });
      state.cart.splice(index, 1);
    }
  },
  actions: {
    loadCatalog: function (context) {
      return new Promise(function (resolve, reject) {
        axios.get("/api/products")
          .then(function (res) {
            context.commit("setCatalog", res.data.results);
            resolve();
          })
          .catch(function () {
            reject();
          });
      });
    },
    findProduct: function (context, code) {
      return new Promise(function (resolve, reject) {
        if (context.state.catalog.length == 0) {
          // Load Catalog
          context.dispatch("loadCatalog")
            .then(function () {
              resolve(_.find(context.state.catalog, { gtinCode: code }));
            })
            .catch(function () { reject(); });
        } else {
          resolve(_.find(context.state.catalog, { gtinCode: code }));
        }
      });
    }

  },
  getters: {

  }
};

let customer = {
  state: {
    customer: {}
  },
  mutations: {},
  actions: {},
  getters: {}
};

export default new Vuex.Store({
  modules: {
    theCatalog: catalog,
    theCustomer: customer
  }
});
