// @ts-ignore
import { isVue3, inject } from 'vue-demi';
import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthSession,
} from '@supabase/supabase-js';

const supabaseSymbol = Symbol('supabase');

/**
 * Used to get the injected instance of SupabaseClient.
 * If using Vuejs 2.x, this function will be undefined, please use
 * `this.$supabase` instead.
 * @returns SupabaseClient
 */
export function useSupabase(): SupabaseClient { 
  return inject(supabaseSymbol);
}

export function install(app: any, options: any) {
  const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

  if (isVue3){
    app.config.globalProperties.$supabase = supabase;
    app.provide(supabaseSymbol, supabase);
  } else {
    Object.defineProperties(app.prototype, {
      $supabase: {
        get: function() {
          return supabase;
        },
      },
    });
    app.supabase = supabase;
  }
}

export {
  SupabaseClient,
  SupabaseClientOptions,
  SupabaseRealtimePayload,
  AuthUser,
  AuthSession,
}