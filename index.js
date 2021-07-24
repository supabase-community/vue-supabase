'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const {isVue2, isVue3 } = require('vue-demi');
const { provide, inject } = isVue3 ? require("vue") : require("@vue/composition-api")

const { createClient } = require('@supabase/supabase-js')

const supabaseKey = 'supabase';

function useSupabase(key = null) { 
  return inject(key !== null ? key : supabaseKey);
}


exports['default'] = {
  supabaseKey,
  useSupabase,
  install: function (app, options) {
    const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

    if (provide) {
      provide(supabaseKey, supabase);
    }

    console.log('is vue 3',isVue3)
    console.log('is vue 2', isVue2)

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
}

module.exports = exports['default'];