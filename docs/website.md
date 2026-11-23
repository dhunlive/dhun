# dhunlive.com — the website (`site/`)

A Next.js App Router app, every page prerendered as static HTML, deployed on Vercel.
English at `/`, Hindi at `/hi`, plus the account deletion page Google Play requires.

| Path | What it is |
|---|---|
| `content/copy.tsx` | Every word on the site, English and Hindi. Pages render one of the two |
| `components/HomePage.tsx`, `DeletePage.tsx` | The two pages, shared by both languages |
| `components/Chrome.tsx` | Header (with the language switch) and footer |
| `components/Phone.tsx` | The party-room illustration in the hero, drawn in HTML |
| `app/` | Routes: `/`, `/hi`, `/delete-account`, `/hi/delete-account`, plus 404, sitemap, robots |
| `app/icon.svg`, `app/apple-icon.png` | The favicon and touch icon: the app icon (`brand/`) |
| `app/fonts/` | Mukta and Fraunces, self-hosted through `next/font/local`, with their OFL licences |
| `next.config.ts` | Security headers, including a CSP that allows only this origin |

This Next.js version has breaking changes from older ones. Read `site/AGENTS.md` and the
guides in `site/node_modules/next/dist/docs/` before changing framework code.

## Before it goes live

These are on the page as placeholders and must be real before launch:

1. **The Grievance Officer's name.** IT Rules 2021 require the name and contact to be
   published. Replace `contact.grievanceName` in both languages in `content/copy.tsx`.
2. **The company's legal details.** Once Dhunlive Private Limited is incorporated, the
   footer should carry the full name, CIN and registered office address.
3. **The mailboxes.** `support@`, `grievance@`, `hosts@` and `partners@dhunlive.com` must
   exist, as aliases on `dev@` at least. Every one is linked from the page.
4. **Terms of service.** Still "before launch" in the footer; add the route once a lawyer has
   written them. **The privacy policy is live** at `/privacy` and `/hi/privacy` (2026-11-23),
   written from what the code does — a lawyer should still review it. Every retention number
   in it comes from the code; change a purge job or `deleteAccount` and change the page (and
   its date) in the same commit. It promises one manual step: uploaded photo files deleted
   within 7 days of a request to support@, because nothing deletes R2 objects yet.
5. **The financial-records retention period** ("up to eight years" on the deletion page)
   is the CA's to confirm.

## Rules for editing

- **Every statement must be true of the app.** The deletion page mirrors
  `backend/src/modules/auth/account.service.ts`. The safety section mirrors spend controls,
  reports and blocks, and the 18+ gate. If one changes, change the other.
- **Never promise earnings.** No amounts, no "earn ₹X a month", and never the word
  "salary". No fixed hours, ever. Hosts earn from gifts, and that is all the page says.
- **No games of chance, and no features that are not decided.** Don't add the lucky wheel,
  quizzes or anything else still open in the build plan.
- **No location.** "Nearby" is a language. The page says Dhun never asks where you are.
- **No third parties.** No analytics, embeds or Google Fonts. The CSP allows only this
  origin; a new dependency means a deliberate edit in `next.config.ts`.
- **Every string in both languages.** `Copy` is one type, so a key missing from `hi`
  fails the build.
- **Keep it static.** The build lists every route as `○ (Static)`. Reading the time,
  cookies or headers in a page would make it dynamic, and the build refuses `new Date()`
  during prerender anyway.

## Deploy: Vercel

**Live since 2026-11-20.** Vercel project `dhun`, root `site`. DNS on Cloudflare, all
**DNS only**: `dhunlive.com` A `216.198.79.1` and `64.29.17.1`, `www` CNAME to
`d98efbbae2e133c7.vercel-dns-017.com`. `dhunlive.com` serves the site and `www` redirects
to it with a 308, because the canonical URLs are on `dhunlive.com`. The certificate is
Vercel's, from Let's Encrypt, renewed automatically. Email records (Google Workspace MX,
SPF, DKIM, DMARC) are separate and were not touched.

First-time setup, for reference:

1. Vercel › **Add New › Project** › import `Sumit240803/dhun`.
2. **Root Directory:** `site`. Vercel detects Next.js; leave the build settings at their
   defaults.
3. **Deploy.** Every push to `main` redeploys. To skip deploys when only the app or
   backend changed, set **Settings › Git › Ignored Build Step** to
   `git diff --quiet HEAD^ HEAD -- .`
4. **Settings › Domains:** add `dhunlive.com` and `www.dhunlive.com`. dhunlive.com's DNS is
   on Cloudflare: add the records Vercel shows, as **DNS only** (grey cloud). A proxied
   record stops Vercel issuing its certificate.

Locally:

```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build    # must list every route as Static
```
