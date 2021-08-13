// @ts-ignore , vue-demi seems to be not strongly typed so typescript freaks out.
import { isVue3, inject, App, Vue2 } from 'vue-demi';
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

type Options = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions;
}

function install(app: typeof Vue2 | App, options: Options) {
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

export default {
  install
}