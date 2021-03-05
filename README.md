# Vue + Supabase

A supa simple wrapper around Supabase.js to enable usage within Vue.

## Usage

```
yarn add vue-supabase
```


```js
import VueSupabase from 'vue-supabase'

Vue.use(VueSupabase, {
  supabaseUrl: "",
  supabaseKey: "",
  supabaseOptions: {},
});
```

```js
let { data: events, error } = await this.$supabase.from("events").select("*");
```
