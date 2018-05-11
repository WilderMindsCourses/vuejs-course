Vue.component("wait-cursor", {
  template: `
<div class="alert alert-info" v-if="busy">
  <i class="fas fa-spinner fa-spin"></i>
  {{ message }}
</div>`,
  props: {
    "message": {
      type: String
    },
    "busy": {
      type: Boolean,
      required: true
    }
  }
});