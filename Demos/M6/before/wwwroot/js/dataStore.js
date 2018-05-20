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

let store = new Vuex.Store({
  modules: {
    theCatalog: catalog,
    theCustomer: customer
  }
});
