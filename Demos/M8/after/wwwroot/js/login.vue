<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h3>Login</h3>
      <wait-cursor :busy="isBusy"></wait-cursor>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <form novalidate @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" name="username" v-model="credentials.username" v-validate="'required'" />
          <span class="text-danger" v-if="errors.has('username')">* Required</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" v-model="credentials.password" v-validate="'required'" />
          <span class="text-danger" v-if="errors.has('password')">* Required</span>
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-success" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    data() {
      return {
        credentials: {},
        isBusy: false,
        error: ""
      }
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll()
          .then((result) => {
            if (result) {
              this.isBusy = true;
              this.$store.dispatch("doAuthentication", this.credentials)
                .then(() => {
                  this.isBusy = false;
                  let redirect = this.$store.getters.redirect;
                  this.$store.commit("clearRedirect");
                  this.$router.push(redirect);
                })
                .catch(() => {
                  this.isBusy = false;
                  this.error = "Failed Login";
                });
            }
          });
      }
    }
  }
</script>