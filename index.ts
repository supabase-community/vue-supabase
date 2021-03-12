import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Plugin } from 'vue';

import type { App } from 'vue';
import type { SupabaseClientOptions } from '@supabase/supabase-js';

let client_instance: SupabaseClient;

export interface VueSupabaseOptions {
  key: string;
  options?: SupabaseClientOptions;
  url: string;
};

export const createSupabase = (options: VueSupabaseOptions): Plugin => {
  return {
    install(app: App) {
      const {
        key,
        options: supabaseOptions = <SupabaseClientOptions>{},
        url,
      } = options;

      client_instance = createClient(url, key, supabaseOptions);
      app.config.globalProperties.$supabase = client_instance;
    }
  }
}

export const useSupabase = (): SupabaseClient => client_instance;

export default {
  createSupabase,
  useSupabase,
}
