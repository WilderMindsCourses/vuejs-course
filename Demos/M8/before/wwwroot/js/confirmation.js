import Vue from "vue";

export default Vue.component("confirmation", {
  template: `
<div>
  <h4>Confirmation</h4>
  <router-link to="/" class="btn btn-info">Next</router-link>
</div>
`
})