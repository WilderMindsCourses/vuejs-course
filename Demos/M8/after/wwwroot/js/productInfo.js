import Vue from "vue";

let piComp = {
  template: `
  <div class="card p-2">
    <div>{{ product.name }}</div>
    <div><img :src="product.imageUrl" :alt="product.name" /></div>
    <router-link to="/" class="btn btn-info btn-sm">&lt; Back</router-link>
  </div>
` ,
  data: function () {
    return {
      product: {}
    };
  },
  props: {
    code: {
      type: String
    },
    currentProduct: {
      required: false
    }
  },
  mounted: function () {
    if (this.currentProduct) {
      this.product = this.currentProduct;
    } else {
      this.$store.dispatch("findProduct", this.code)
        .then(function (res) {
          this.product = res;
        }.bind(this));
    }
  }
}

export default  Vue.component("product-info", piComp);
