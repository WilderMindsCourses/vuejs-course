// app.js
Vue.use(VueRouter);
Vue.use(VeeValidate);

let routes = [
  { path: "/", component: ProductList },
  { path: "/checkout", component: Checkout }
];

var vm = new Vue({
  el: "#index-view",
  store,
  router: new VueRouter({ routes })
});