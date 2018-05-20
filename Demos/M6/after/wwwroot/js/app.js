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