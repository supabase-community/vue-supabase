// @ts-ignore
import { inject, onMounted, onUnmounted } from "vue-demi";
import {
  SupabaseClient,
  AuthChangeEvent,
  Session,
} from "@supabase/supabase-js";
import supabaseSymbol from "./symbol";

export function useSupabase(): SupabaseClient {
  const supabase = inject<SupabaseClient>(supabaseSymbol);
  if (!supabase) {
    throw new Error("Supabase provider not found");
  }
  return supabase;
}

export function useSupabaseAuth(): SupabaseClient["auth"] {
  const supabase = useSupabase();
  return supabase.auth;
}

export function useSupabaseStorage(): SupabaseClient["storage"] {
  const supabase = useSupabase();
  return supabase.storage;
}

export function useSupabaseFrom(): SupabaseClient["from"] {
  const supabase = useSupabase();
  return supabase.from;
}

export function useSupabaseFunctions(): SupabaseClient["functions"] {
  const supabase = useSupabase();
  return supabase.functions;
}

type AuthChangeHandler = (
  event: AuthChangeEvent,
  session: Session | null
) => void;

export function useOnAuthStateChange(callback: AuthChangeHandler): void {
  const client = useSupabase();

  onMounted(() => {
    if (client.auth.session()) {
      callback("SIGNED_IN", client.auth.session());
    }
  });

  const { data: authListener } = client.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );

  onUnmounted(() => {
    authListener?.unsubscribe();
  });
}
