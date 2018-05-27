<template>
  <div class="alert alert-info" v-if="busy">
    <i class="fas fa-spinner fa-spin"></i>
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: "wait-cursor",
    props: {
      "message": {
        type: String
      },
      "busy": {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style scoped>
  .fas .fa-spinner {
    color: red;
  }
</style>