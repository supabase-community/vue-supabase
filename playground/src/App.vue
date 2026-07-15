<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSupabaseClient } from "../../src";

interface Database {
  public: {
    Tables: {
      countries: {
        Row: { name: string | null; code: string | null };
        Insert: { name?: string | null; code?: string | null };
        Update: { name?: string | null; code?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

type Row = Database["public"]["Tables"]["countries"]["Row"];

const supabase = useSupabaseClient<Database>();
const loading = ref(true);
const errorMessage = ref<string | null>(null);
const rows = ref<Row[]>([]);

onMounted(async () => {
  try {
    const { data, error: queryError } = await supabase
      .from("countries")
      .select("*")
      .limit(5);

    if (queryError) {
      throw queryError;
    }

    rows.value = data ?? [];
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Unknown error";
  } finally {
    loading.value = false;
  }
});

const clientInfo = computed(() => ({
  initialized: true,
  auth: typeof supabase.auth?.signInWithPassword,
  status: loading.value ? "loading" : errorMessage.value ? "error" : "ready",
  rows: rows.value.length,
}));
</script>

<template>
  <main>
    <h1>vue-supabase playground</h1>
    <p>This app is wired to the local package from the repository root.</p>
    <pre>{{ clientInfo }}</pre>

    <p v-if="loading">Loading sample data…</p>
    <ul v-else-if="rows.length">
      <li v-for="(row, index) in rows" :key="index">
        {{ JSON.stringify(row) }}
      </li>
    </ul>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <p v-else>No rows returned.</p>
  </main>
</template>
