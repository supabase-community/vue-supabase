import Vue from 'vue'

import { SupabaseClient } from '@supabase/supabase-js'

declare module 'vue/types/vue' {
  interface Vue {
    $supabase: SupabaseClient
  }
}

/**
 * Used to get the injected instance of SupabaseClient.
 * If using Vuejs 2.x, this function will be undefined, please use
 * `this.$supabase` instead.
 * @returns SupabaseClient
 */
export function useSupabase(key?: string): SupabaseClient;
export const supabaseKey: string;

export default {
  install(Vue: typeof Vue, options: any): void
}