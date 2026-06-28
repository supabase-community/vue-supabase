# @supabase-community/vue

This package provides a typed wrapper around the official Supabase JavaScript client for Vue 3 applications. It keeps the API close to the official SDK so you can use `supabase.auth`, `supabase.from`, and other features directly.

## Features

- Vue 3 composable `useSupabaseClient`
- Authentication support
- Use supabase-js isomorphic client
- TypeScript support

## Getting started

1. Install the plugin

```bash
npm install @supabase-community/vue
```

2. Add required environment variables:

```bash
# .env
VITE_SUPABASE_URL="https://example.supabase.co"
VITE_SUPABASE_ANON_KEY="<your_publishable_key>"
```

3. Register a client:

```ts
// main.ts
import { useSupabaseClient } from "@supabase-community/vue";

const supabase = useSupabaseClient({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});
```

4. Use the client in your Vue app

```ts
// App.vue
<script setup lang="ts">
import { useSupabaseClient } from "@supabase-community/vue";

const supabase = useSupabaseClient();
const { data, error } = await supabase.from("profiles").select("*");
</script>

<template>
  <ul>
    <li v-for="profile in data" :key="profile.id">
      {{ profile }}
    </li>
  </ul>
</template>
```

And that's it! You are good to go!

## Advanced

This section covers a few common advanced patterns that work naturally with the composable.

### Realtime

Realtime subscriptions work directly through the Supabase client, so you can react to database changes in your Vue app.

```ts
const supabase = useSupabaseClient();

const channel = supabase.channel("profiles-updates");

channel
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "profiles" },
    payload => {
      console.log("Change received:", payload);
    }
  )
  .subscribe();
```

### TypeScript

You can either define your own local types or generate them from your Supabase project with the CLI. The generated types are especially useful when your schema evolves over time.

Local type registration:

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
```

Generate types from the Supabase CLI:

```bash
npx supabase login
npx supabase gen types typescript --project-id <project-id> --schema public > src/types/supabase.ts
```

Then use the generated types in your app:

```ts
import { useSupabaseClient } from "@supabase-community/vue";
import type { Database } from "./types/supabase";

const supabase = useSupabaseClient<Database>({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});
```

### Auth

Auth stays close to the official Supabase client API and works the same way as in the core SDK.

```ts
const supabase = useSupabaseClient();

await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password",
});
```

## Development

1. Clone this repository
2. Install dependencies using `npm install`
3. Prepare development server using `pnpm dev:prepare`
4. Build module using `pnpm build`
5. Launch playground using `pnpm dev`

## License

[MIT License](./LICENSE)
