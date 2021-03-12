# Vue.js + Supabase

A supa simple wrapper around Supabase.js to enable usage within Vue.js.

## Usage

```shell
npm install --save vue-supabase

# OR

yarn add vue-supabase
```

### Using with Vue.js 2.x

This plugin is designed for Vue.js 3, but you can still use it with Vue.js 2. Please take a look at the v1.x.x tag [here](https://github.com/supabase/vue-supabase/tree/v1.x.x).

### Using with Vue.js 3.x

```ts
// main.ts
import { createApp } from 'vue';
import { createSupabase } from 'vue-supabase';

import App from './App.vue';

const supabase = createSupabase({
  url: "https://xyzcompany.supabase.co",
  key: "public-anon-key",
  options: {
    // ...
  };
});

createApp(App)
  .use(supabase)
  .mount('#app');
```

```js
// App.vue
import { useSupabase } from "vue-supabase";

const supabase = useSupabase();
const { data, error } = await supabase.from("events").select("*");
```
