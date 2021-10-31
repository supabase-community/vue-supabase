/** @ts-ignore , vue-demi seems to be not strongly typed so typescript freaks out. */
import { App, Vue2, Plugin, PluginObject } from "vue-demi";
import {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthSession,
} from "@supabase/supabase-js";
import { VueSupabaseClient, createVueSupabase } from "./VueSupabaseClient";
import {
  useSupabase,
  useSupabaseAuth,
  useSupabaseStorage,
} from "./composables";

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

export { useSupabase, useSupabaseAuth, useSupabaseStorage, createVueSupabase };

export {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthUser as User,
  AuthSession,
  AuthSession as Session,
};

const VueSupabase: PluginObject<SupabasePluginOptions> | Plugin = {
  install,
};

export default VueSupabase;
