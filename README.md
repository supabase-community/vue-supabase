# Vue + Supabase

A supa simple wrapper around Supabase.js to enable usage within Vue.js.

## Usage

```shell
npm install --save vue-supabase

# OR

yarn add vue-supabase
```


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
import { useSupabase } from 'vue-supabase';

const supabase = useSupabase();
const { data, error } = await supabase.from("events").select("*");
```
