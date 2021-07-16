'use strict';
import {install, inject, isVue2, isVue3} from "vue-demi"

import { createClient } from '@supabase/supabase-js'

export const supabaseKey = 'supabase';

export function useSupabase(key = null) { 
  return inject(key !== null ? key : supabaseKey);
}

export default {
  install: function (app, options) {
    const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

    app.provide(supabaseKey, supabase);

    if (isVue3){
      app.config.globalProperties.$supabase = supabase;
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
};
