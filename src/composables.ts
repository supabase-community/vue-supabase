// @ts-ignore
import { inject } from "vue-demi";
import { SupabaseClient } from "@supabase/supabase-js";
import supabaseSymbol from "./symbol";

export function useSupabase(): SupabaseClient {
  return inject(supabaseSymbol);
}

export function useSupabaseAuth(): SupabaseClient["auth"] {
  const supabase = useSupabase();
  return supabase.auth;
}

export function useSupabaseStorage(): SupabaseClient["storage"] {
  const supabase = useSupabase();
  return supabase.storage;
}
