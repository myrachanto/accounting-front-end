import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import store from "./store";
import vuetify from "./plugins/vuetify";

axios.defaults.baseURL = 'http://localhost:2000'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");
