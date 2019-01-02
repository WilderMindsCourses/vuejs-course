import Vue from 'vue';
import App from './Another.vue';

Vue.config.productionTip = false; 

new Vue({
  render: h => h(App),
}).$mount('#another');
