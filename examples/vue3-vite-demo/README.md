# Vue 3 + Vite + Supabase

## Getting Started

- Run `yarn install` to pull all the required dependencies
- Create a `.env` file on the root of this project i.e. `../vue3-vite-demo/.env`
- Add the variable `VITE_SUPABSE_URL` and set its value
- Add the variable `VITE_SUPABASE_KEY` and set its value
- Run `yarn dev`

## How `yarn dev` works

The scripts starts by looking for and removing any tarballs on the root directory of this project. The next step, the root project _vue-supabase_ is packed into a tarball, the version is then removed from the name. The script then uses that tarball to install _vue-supabase_ as a dependency.
