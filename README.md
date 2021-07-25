# Vue + Supabase

A supa simple wrapper around Supabase.js to enable usage within Vue.

## Installation
```bash
# Vue 3.x
yarn add vue-supabase

# Vue 2.x
yarn add @vue/composition-api vue-supabase
```

Note: Currently `@vue/composition-api` is required for this package to work for projects using Vue 2.x.

## Usage
### Vue 2.x
```js
import VueSupabase from 'vue-supabase'

Vue.use(VueSupabase, {
  supabaseUrl: '',
  supabaseKey: '',
  supabaseOptions: {}
});
```

```
const { data, error } = await this.$supabase.from("events").select("*");
```

### Vue 3.x
```js
import VueSupabase from 'vue-supabase'

const app = createApp(...)

app.use(VueSupabase, {
  supabaseUrl: '',
  supaaseKey: '',
  supabaseOptions: {}
})

app.mount(...)
```

#### Options API
```js
const { data, error } = await this.$supabase.from("events").select("*");
```

#### Composition API
```js
import { useSupabase } from 'vue-supabase';

const supabase = useSupabase()

const { data, error } = await supabase.from("events").select("*");
```
