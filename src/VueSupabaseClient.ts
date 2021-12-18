// @ts-ignore
import { Vue2, App, isVue3 } from "vue-demi";
import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import supabaseSymbol from "./symbol";
export class VueSupabaseClient extends SupabaseClient {
  constructor(
    supabaseUrl: string,
    supabaseKey: string,
    supabaseOptions?: SupabaseClientOptions
  ) {
    super(supabaseUrl, supabaseKey, supabaseOptions);
  }

  install(app: typeof Vue2 | App) {
    const self = this;
    if (isVue3) {
      app.provide(supabaseSymbol, self);
      Object.defineProperty(app.config.globalProperties, "$supabase", {
        get: () => self,
        configurable: true,
      });
    } else {
      app.mixin({
        provide: () => ({
          [supabaseSymbol]: self,
        }),
      });
      Object.defineProperty(app.prototype, "$supabase", {
        get: () => self,
        configurable: true,
      });
      app.$supabase = self;
    }
  }
}

export function createVueSupabase({
  supabaseUrl,
  supabaseKey,
  supabaseOptions,
}: {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions?: SupabaseClientOptions;
}) {
  return new VueSupabaseClient(supabaseUrl, supabaseKey, supabaseOptions);
}
