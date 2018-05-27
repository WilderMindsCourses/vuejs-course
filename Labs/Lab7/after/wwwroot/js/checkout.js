// checkout.js
import Vue from "vue";

export default Vue.component("checkout", {
  template: `<div>
  <form v-on:submit.prevent="onSave()">
    <div class="form-group">
      <label>Name</label>
      <input class="form-control"
             v-model="customer.name"
             name="customerName"
             v-validate="{ required: true }" />
      <span class="text-danger">{{ errors.first("customerName") }}</span>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input class="form-control"
             v-model="customer.email"
             name="email"
             v-validate="{ required: true, email: true }" />
      <span class="text-danger">{{ errors.first("email") }}</span>
    </div>
    <div class="form-group">
      <router-link to="/" class="btn btn-info">Cancel</router-link>
      <input type="submit" class="btn" value="Save" />
    </div>
  </form>
</div>`,
  data: function () {
    return {
      customer: {}
    };
  },
  methods: {
    onSave: function () {
      alert(JSON.stringify(this.customer));
    }
  }
});