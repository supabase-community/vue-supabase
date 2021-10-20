import Vue from "vue";
import App from "./App.vue";
import VueSupabase from "vue-supabase";

Vue.config.productionTip = false;
Vue.use(VueSupabase, {
  supabaseUrl: process.env.VUE_APP_SUPABASE_URL,
  supabaseKey: process.env.VUE_APP_SUPABASE_KEY,
});

new Vue({
  render: h => h(App),
}).$mount("#app");
