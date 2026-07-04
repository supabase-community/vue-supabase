import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createSupabaseClientFromConfig,
  getSupabaseClient,
  setSupabaseClient,
} from "./state";
import type { UseSupabaseClientOptions } from "./types";

/**
 * Returns a shared Supabase client for Vue 3 apps.
 *
 * The composable supports either passing an existing client instance or
 * initializing one from a URL and anon key. Once initialized, subsequent
 * calls without options return the shared client.
 */
export function useSupabaseClient<Database = Record<string, never>>(
  options?: UseSupabaseClientOptions<Database>
): SupabaseClient<Database> {
  if (options?.client) {
    setSupabaseClient(options.client);
    return options.client;
  }

  const existingClient = getSupabaseClient();
  if (existingClient) {
    if (options && (options.supabaseUrl || options.supabaseKey)) {
      throw new Error(
        "[vue-supabase] A Supabase client has already been initialized. Reinitialization is not supported."
      );
    }
    return existingClient as SupabaseClient<Database>;
  }

  if (!options) {
    throw new Error(
      "[vue-supabase] No Supabase client has been initialized. Call useSupabaseClient({ client }) or useSupabaseClient({ supabaseUrl, supabaseKey }) first."
    );
  }

  if (!options.supabaseUrl || !options.supabaseKey) {
    throw new Error(
      "[vue-supabase] Missing Supabase client configuration. Provide either { client } or { supabaseUrl, supabaseKey }."
    );
  }

  const client = createSupabaseClientFromConfig<Database>(
    options.supabaseUrl,
    options.supabaseKey,
    options.options
  );

  setSupabaseClient(client);
  return client;
}
