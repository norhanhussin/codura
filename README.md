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

Trial-booking submissions require these server-side environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Set them in your local environment or an untracked `.env` file before starting the app. Never add the service-role key to client code or expose it through a `VITE_` variable. The service-role client is used only by the server booking handler.

## Checks

```sh
npm test
npm run lint
npm run build
```
