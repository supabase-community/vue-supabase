'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { isVue3 } = require('vue-demi');

const { createClient } = require('@supabase/supabase-js')

const supabasesymbol = Symbol('supabase');

function useSupabase() { 
  return inject(supabasesymbol);
}


exports['default'] = {
  useSupabase,
  install: function (app, options) {
    const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

    if (isVue3){
      app.config.globalProperties.$supabase = supabase;
      app.provide(supabasesymbol, supabase);
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
}

module.exports = exports['default'];