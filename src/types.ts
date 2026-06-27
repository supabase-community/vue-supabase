import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Options for initializing a shared Supabase client via the composable.
 */
export interface UseSupabaseClientOptions<Database = Record<string, never>> {
  /**
   * Reuse an existing Supabase client instance.
   */
  client?: SupabaseClient<Database>;
  /**
   * Supabase project URL.
   */
  supabaseUrl?: string;
  /**
   * Supabase anonymous/service key.
   */
  supabaseKey?: string;
  /**
   * Optional client options forwarded to Supabase JS.
   */
  options?: Parameters<typeof import("@supabase/supabase-js").createClient>[2];
}
