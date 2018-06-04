<template>
  <div class="row">
    <div class="card offset-md-3 col-md-6">
      <router-link class="btn btn-sm btn-info" to="/">
        <i class="fas fa-left"></i> Back
      </router-link>
      <h3>Customer Info</h3>
      <div class="alert alert-warning" v-if="error">{{ error }}</div>
      <ul>
        <li><strong>Name</strong>: {{ $store.state.theCustomer.customer.name }}</li>
        <li><strong>Company</strong>: {{ $store.state.theCustomer.customer.company }}</li>
        <li><strong>Phone</strong>: {{ $store.state.theCustomer.customer.phone }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        error: ""
      };
    },
    mounted() {
      this.$store.dispatch("getCustomerInfo")
        .then()
        .catch(() => this.error = "Failed to get Customer Info");
    }
  };

</script>