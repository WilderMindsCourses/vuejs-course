// cart.js
Vue.component("the-cart", {
  template: `
<div>
  <h3>Shopping Cart</h3>
  <button class='btn btn-info' v-on:click="emptyCart">Empty Cart</button>
  <router-link to="/checkout" class="btn btn-success">Checkout</router-link>
  <div v-for="i in items">
    <div>{{ i.name }} - {{ i.listPrice }}</div>
    <hr/>
  </div>
</div>
`,
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    emptyCart: function () {
      this.$emit("empty-cart");
    }
  }
});