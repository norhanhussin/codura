<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Codura Academy — project rules

- The site is Arabic-first and fully RTL (`lang="ar" dir="rtl"` on `<html>` in `src/routes/__root.tsx`); never revert direction or language.
- Never invent business facts: no prices, session durations, course levels, testimonials, achievements, or fake availability. Unconfirmed details render as "سيتم الإعلان عنه" via the empty-string placeholders in `src/lib/site.ts`.
- Owner-editable business config (WhatsApp number, Facebook/Instagram URLs, subscription packages) lives ONLY in `src/lib/site.ts`; components read from there, never hardcode links.
- Trial bookings are written exclusively through `submitTrialBooking` (`src/lib/booking.functions.ts`, zod-validated, service-role insert inside the handler). `public.trial_bookings` has RLS enabled with NO policies — do not add anon/authenticated policies or public read paths; booking data is private.
- Student age must stay within 6–18 (enforced in `src/lib/booking-schema.ts`, the DB CHECK, and covered by `src/test/booking-validation.test.ts`).
