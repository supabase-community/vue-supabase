import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let sharedClient: unknown = null;

export function setSupabaseClient<Database>(
  client: SupabaseClient<Database>
): void {
  sharedClient = client;
}

export function getSupabaseClient<
  Database = Record<string, never>,
>(): SupabaseClient<Database> | null {
  return sharedClient as SupabaseClient<Database> | null;
}

export function resetSupabaseClient(): void {
  sharedClient = null;
}

export function createSupabaseClientFromConfig<
  Database = Record<string, never>,
>(
  supabaseUrl: string,
  supabaseKey: string,
  options?: Parameters<typeof createClient>[2]
): SupabaseClient<Database> {
  return createClient<Database>(supabaseUrl, supabaseKey, options);
}
