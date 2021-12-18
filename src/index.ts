/** @ts-ignore , vue-demi seems to be not strongly typed so typescript freaks out. */
import { App, Vue2, Plugin, PluginObject } from "vue-demi";
import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import { VueSupabaseClient } from "./VueSupabaseClient";

// @ts-expect-error: Module vue/types/vue cannot be found.
declare module "vue/types/vue" {
  interface Vue {
    $supabase: SupabaseClient;
  }
}

export type SupabasePluginOptions = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions;
};

export function install(
  app: typeof Vue2 | App,
  options: SupabasePluginOptions
) {
  const supabase = new VueSupabaseClient(
    options.supabaseUrl,
    options.supabaseKey,
    options.supabaseOptions
  );
  supabase.install(app);
}

const VueSupabasePlugin: PluginObject<SupabasePluginOptions> | Plugin = {
  install,
};

export {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthUser as User,
  AuthSession,
  AuthSession as Session,
  Subscription,
} from "@supabase/supabase-js";

export * from "./composables";

export { createVueSupabase } from "./VueSupabaseClient";

export default VueSupabasePlugin;
