import Vue from "vue";

export default  Vue.component("checkout", {
  template: `<div>
  <h3>Checkout Wizard</h3>
  <div class="card p-2">
    <router-view></router-view>
  </div>
</div>`
});
