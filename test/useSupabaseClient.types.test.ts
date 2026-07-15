import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { useSupabaseClient } from "../src";

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string | null };
        Insert: { id?: string; name?: string | null };
        Update: { name?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

describe("useSupabaseClient generic typing", () => {
  it("accepts generated database types", async () => {
    const client = {
      auth: {},
      from: () => ({
        select: () => ({ data: [{ id: "1", name: "Ada" }], error: null }),
      }),
    } as unknown as SupabaseClient<Database>;

    const typedClient = useSupabaseClient<Database>({ client });

    const result = await typedClient.from("profiles").select("*");

    expect(result.data).toEqual([{ id: "1", name: "Ada" }]);
    expect(result.error).toBeNull();
  });
});
