// Login.js
import Vue from "vue";

export default Vue.component("login", {
  template: `
<div class="col-md-6 offset-3">
  <h3>Login</h3>
  <div v-if="error" class="text-danger">{{ error }}</div>
  <form novalidate @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" 
             name="username" 
             class="form-control" 
             v-model="credentials.username" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" 
             name="password" 
             class="form-control" 
             v-model="credentials.password" />
    </div>
    <div class="form-group">
      <input type="submit" class="btn btn-success" value="Login" />
    </div>
  </form>
</div>
`,
  data() {
    return {
      credentials: {},
      error: ""
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("doAuth", this.credentials)
        .then(() => {
          this.$router.push("/checkout");
        })
        .catch(() => this.error = "Failed to login");
    }
  }
})