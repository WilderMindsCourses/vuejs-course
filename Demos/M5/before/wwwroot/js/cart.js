Vue.component("the-cart", function (resolve, reject) {

  axios.get("/templates/cart.html")
    .then(function (res) {
      resolve({
        template: res.data,
        props: {
          items: {
            type: Array,
            required: true
          }
        }
      });
    })
    .catch(function () { reject(); });
});