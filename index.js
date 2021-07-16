'use strict';

const { createClient } = require('@supabase/supabase-js')

module.exports = {
  install: function (Vue, options) {
    const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

    Object.defineProperties(Vue.prototype, {
      $supabase: {
        get: function() {
          return supabase;
        },
      },
    });

    Vue.supabase = supabase;
  }
}