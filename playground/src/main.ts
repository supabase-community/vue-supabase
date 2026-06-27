import { createApp } from "vue";
import App from "./App.vue";
import { useSupabaseClient } from "../../src";

const app = createApp(App);

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://wddenkjnmciullodmwes.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "sb_publishable_FdeDd0WnZXMxYMzh006AkQ_b5ODpTZ8";

app.config.globalProperties.$supabase = useSupabaseClient({
  supabaseUrl,
  supabaseKey,
});

app.mount("#app");
