import Vue from "vue";
import Component from "vue-class-component";
import { Product } from "./Product";

@Component({
  template: `
<div>
  <h4>Shipping</h4>
  <router-link to="confirmation" class="btn btn-info">Next</router-link>
</div>
`
})
export default class Shipping extends Vue {
  currentProduct: Product;  

  onApproveShipping() {
    // ...
  }

  mounted() {

  }

}