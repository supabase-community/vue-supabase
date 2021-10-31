import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
export type Options = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions;
};
declare module "vue/types/vue" {
  interface Vue {
    $supabase: SupabaseClient;
  }
}
