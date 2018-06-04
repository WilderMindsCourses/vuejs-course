import Vue from 'vue';
import axios from 'axios';

export default Vue.component("the-cart", function (resolve, reject) {

  axios.get("/templates/cart.html")
    .then(function (res) {
      resolve({
        template: res.data,
        methods: {
          onDeleteItem: function (line) {
            this.$store.commit("deleteCartItem", line);
          }
        },
        computed: {
          items: function () {
            return this.$store.state.theCatalog.cart;
          },
          subtotal: function () {
            return _.sumBy(this.$store.state.theCatalog.cart, function (c) { return c.price * c.quantity; })
          }
        }
      });
    })
    .catch(function () { reject(); });
});