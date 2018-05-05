Vue.use(VeeValidate)

new Vue({
  el: "#theForm",
  data: {
    customer: {}
  },
  methods: {
    onSave: function () {
      alert(JSON.stringify(this.customer));
    }
  }
});