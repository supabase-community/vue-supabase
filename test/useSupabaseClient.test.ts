import { beforeEach, describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { resetSupabaseClient, useSupabaseClient } from "../src";

describe("useSupabaseClient", () => {
  beforeEach(() => {
    resetSupabaseClient();
  });

  it("creates a client from supabaseUrl and supabaseKey", () => {
    const client = useSupabaseClient({
      supabaseUrl: "https://example.supabase.co",
      supabaseKey: "anon-key",
    });

    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });

  it("returns an existing client when provided", () => {
    const existingClient = {
      auth: {},
    } as unknown as SupabaseClient;

    const client = useSupabaseClient({ client: existingClient });

    expect(client).toBe(existingClient);
  });

  it("stores the initialized client for later reuse", () => {
    const initialClient = useSupabaseClient({
      supabaseUrl: "https://example.supabase.co",
      supabaseKey: "anon-key",
    });

    const reusedClient = useSupabaseClient();

    expect(reusedClient).toBe(initialClient);
  });

  it("throws when configuration is incomplete", () => {
    expect(() =>
      useSupabaseClient({
        supabaseUrl: "https://example.supabase.co",
      } as never)
    ).toThrowError(/Missing Supabase client configuration/);
  });

  it("throws when called without prior initialization and without options", () => {
    expect(() => useSupabaseClient()).toThrowError(
      /No Supabase client has been initialized/
    );
  });

  it("throws when reinitializing with a different configuration", () => {
    useSupabaseClient({
      supabaseUrl: "https://example.supabase.co",
      supabaseKey: "anon-key",
    });

    expect(() =>
      useSupabaseClient({
        supabaseUrl: "https://second.supabase.co",
        supabaseKey: "another-key",
      })
    ).toThrowError(/already been initialized/i);
  });

  it("supports typed database generics", () => {
    const client = useSupabaseClient<{ profiles: { id: string } }>({
      supabaseUrl: "https://example.supabase.co",
      supabaseKey: "anon-key",
    });

    void client.from("profiles").select("*");
  });
});
