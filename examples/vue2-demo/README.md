# vue2 + composition-api + Supabase

## Getting Started

- Run `yarn install` to pull all the required dependencies
- Create a `.env` file on the root of this project i.e. `../vue3-vite-demo/.env`
- Add the variable `VUE_APP_SUPABSE_URL` and set its value
- Add the variable `VUE_APP_SUPABASE_KEY` and set its value
- Run `yarn serve`

## How `yarn serve` works

The scripts starts by looking for and removing any tarballs on the root directory of this project. The next step, the root project _vue-supabase_ is packed into a tarball, the version is then removed from the name. The script then uses that tarball to install _vue-supabase_ as a dependency.
