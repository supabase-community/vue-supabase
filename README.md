# Vue + Supabase

A supa simple wrapper around Supabase.js to enable usage within Vue.

## Usage

```
yarn add vue-supabase
```

import VueSupabase from 'vue-supabase'

```js
Vue.use(VueSupabase, {
  supabaseUrl: "",
  supabaseKey: "",
  supabaseOptions: {},
});
```

```js
let { data: events, error } = await this.$supabase.from("events").select("*");
```
