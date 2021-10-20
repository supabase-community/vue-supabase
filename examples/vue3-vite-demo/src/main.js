import { createApp } from "vue";
import App from "./App.vue";
import { createVueSupabase } from "vue-supabase";

const supabase = createVueSupabase({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
});

createApp(App).use(supabase).mount("#app");
