import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
export type Options<SchemaName> = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions<SchemaName>;
};
declare module "vue/types/vue" {
  interface Vue {
    $supabase: SupabaseClient;
  }
}
