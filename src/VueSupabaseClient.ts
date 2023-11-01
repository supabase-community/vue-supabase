// @ts-ignore
import { Vue2, App, isVue3 } from "vue-demi";
import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
import supabaseSymbol from "./symbol";

export class VueSupabaseClient<SchemaName> extends SupabaseClient {
  constructor(
    supabaseUrl: string,
    supabaseKey: string,
    supabaseOptions?: SupabaseClientOptions<SchemaName>
  ) {
    super(supabaseUrl, supabaseKey, supabaseOptions as any);
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

export function createVueSupabase<SchemaName>({
  supabaseUrl,
  supabaseKey,
  supabaseOptions,
}: {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions?: SupabaseClientOptions<SchemaName>;
}) {
  return new VueSupabaseClient<SchemaName>(
    supabaseUrl,
    supabaseKey,
    supabaseOptions
  );
}
