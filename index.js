'use strict';

import { createClient } from '@supabase/supabase-js'

export default {
  install: function (Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $supabase: {
        get: function() {
          const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)
          return supabase;
        },
      },
    });

    Vue.supabase = supabase;
  }
};
