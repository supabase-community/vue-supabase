# vue-supabase v3

A minimal Vue 3 integration layer for Supabase that focuses on a single composable: `useSupabaseClient()`.

## What it does

This package provides a thin, typed wrapper around the official Supabase JavaScript client for Vue 3 applications. It keeps the API close to the official SDK so you can use `supabase.auth`, `supabase.from`, and other features directly.

## Installation

```bash
npm install @supabase-community/vue
```

## Initialize once

```ts
import { useSupabaseClient } from "@supabase-community/vue";

const supabase = useSupabaseClient({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});
```

## Reuse the shared client later

```ts
import { useSupabaseClient } from "@supabase-community/vue";

const supabase = useSupabaseClient();
const { data, error } = await supabase.from("profiles").select("*");
```

## Use an existing client instance

```ts
import { createClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase-community/vue";

const client = createClient("https://example.supabase.co", "anon-key");
useSupabaseClient({ client });
```

## Typed Database support

```ts
import { useSupabaseClient } from "@supabase-community/vue";

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string | null };
        Insert: { id?: string; name?: string | null };
        Update: { name?: string | null };
      };
    };
  };
}

const supabase = useSupabaseClient<Database>({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});

const { data } = await supabase.from("profiles").select("*");
```

## Auth

Auth stays close to the official Supabase client API:

```ts
const supabase = useSupabaseClient();

await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});
```

## Notes

- The package intentionally keeps the surface area small.
- There is a single shared client instance per module.
- Reinitialization with a different configuration is rejected to keep behavior predictable.
