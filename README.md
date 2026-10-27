# Codura Coding

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://codura-coding.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fff60f44-462e-4da0-8cc9-ae97628130ea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Local environment

Copy `.env.example` to `.env` and set the new Supabase project's URL and publishable key in all four variables shown there. The `VITE_` variables are used by browser code; the non-`VITE_` variables are used by the server booking handler. The publishable key is designed for client use and is not a secret. Never put a service-role or secret key in a `VITE_` variable or browser code.

Before booking submissions can be stored, review and run `supabase/trial_bookings_setup.sql` in the new project's Supabase SQL Editor. It creates `trial_bookings` if absent, keeps direct table access closed with RLS, and grants the anonymous role access only to a validated insert function. The application still validates each booking in its server function.

If the base booking setup was already applied before adding the web or data-analysis learning paths, review and run `supabase/add_web_learning_path.sql` in the same project's SQL Editor. This updates the allowed learning-path values in both the table constraint and booking RPC without removing existing bookings.

For deployment, configure the `VITE_` variables in the hosting platform's build environment and `SUPABASE_URL` plus `SUPABASE_PUBLISHABLE_KEY` in its server runtime environment. A local `.env` file is not uploaded automatically. This repository targets a Cloudflare Nitro build through the Lovable Vite config; the exact dashboard for the current `lovable.app` deployment is managed outside this repository and must be confirmed in the hosting project.

## Checks

```sh
npm test
npm run lint
npm run build
```
