// auth.js
import axios from "axios";

export default {
  state: {
    jwt: "",
    expiration: new Date(),
    redirect: ""
  },
  getters: {
    isAuthenticated(state) {
      return state.jwt && state.expiration > new Date();
    },
    token: (state) => state.jwt,
    redirect: (state) => state.redirect
  },
  actions: {
    doAuthentication(context, creds) {
      return new Promise(function (resolve, reject) {
        axios.post("/api/account/createtoken", creds)
          .then((res) => {
            context.commit("setTokenInfo", res.data);
            resolve();
          })
          .catch(() => reject() );
      });
    }
  },
  mutations: {
    setTokenInfo(state, tokenInfo) {
      state.jwt = tokenInfo.token;
      state.expiration = new Date(tokenInfo.expiration);
    },
    setRedirect(state, path) {
      state.redirect = path;
    },
    clearRedirect(state) {
      state.redirect = "";
    }
  }
}