# dhunlive.com — the website (`site/`)

Lives in `site/`, which is published as-is: anything in that folder is public, so notes like this one stay in `docs/`.

The public website: what Dhun is, how to host, safety, contact, and the account deletion
page Google Play requires. Plain HTML and CSS, no framework and no build step. English is
in the HTML; `i18n.js` adds Hindi and the language switch.

| File | What it is |
|---|---|
| `index.html` | The home page |
| `delete-account.html` | How to delete an account, what is deleted, what is kept. Its URL goes into Play Console |
| `404.html` | Served by Cloudflare Pages for any unknown path |
| `styles.css` | Every style. Colours are the app's own (`mobile/src/theme/primitives.ts`) |
| `i18n.js` | Every Hindi string, keyed by `data-i18n` |
| `_headers` | Security headers and font caching, read by Cloudflare Pages |
| `fonts/` | Mukta (Latin + Devanagari) and Fraunces, self-hosted, with their OFL licences |

## Before it goes live

These are on the page as placeholders and must be real before launch:

1. **The Grievance Officer's name.** IT Rules 2021 require the name and contact to be
   published. Replace "Name published before launch" in `index.html` and
   `contact.grievance.name` in `i18n.js`.
2. **The company's legal details.** Once Dhunlive Private Limited is incorporated, the
   footer should carry the full name, CIN and registered office address.
3. **The mailboxes.** `support@`, `grievance@`, `hosts@` and `partners@dhunlive.com` must
   exist, as aliases on `dev@` at least. Every one is linked from the page.
4. **Privacy policy and terms.** Listed in the footer as "before launch". Google Play needs
   the privacy policy URL before the first submission. Add `privacy.html` and `terms.html`
   once a lawyer has written them, and link them.
5. **The financial-records retention period** ("up to eight years" on the deletion page)
   is the CA's to confirm.

## Rules for editing

- **Every statement must be true of the app.** The deletion page mirrors
  `backend/src/modules/auth/account.service.ts`. The safety section mirrors spend controls,
  reports and blocks, and the 18+ gate. If one changes, change the other.
- **Never promise earnings.** No amounts, no "earn ₹X a month", and never the word
  "salary". No fixed hours, ever. Hosts earn from gifts, and that is all the page says.
- **No games of chance, and no features that are not decided.** The page says Dhun has
  none, which is hard rule #1. Don't add the lucky wheel, quizzes or anything else still
  open in the build plan.
- **No location.** "Nearby" is a language. The page says Dhun never asks where you are.
- **No third parties.** No analytics, embeds, CDNs or Google Fonts. The CSP in `_headers`
  allows only this origin, and a new dependency means a deliberate edit there.
- **Every string in both languages.** A new `data-i18n` key needs its Hindi in `i18n.js`.

## Deploy: Cloudflare Pages

dhunlive.com's DNS is already on Cloudflare.

1. Cloudflare dashboard › **Workers & Pages** › **Create** › **Pages** › **Connect to Git**,
   then pick the `Sumit240803/dhun` repository.
2. **Production branch:** `main`. **Framework preset:** None. **Build command:** leave it
   empty. **Build output directory:** `site`.
3. **Root directory (advanced):** leave it empty. Otherwise Cloudflare looks for `site`
   inside `site`.
4. **Save and deploy.** Every push to `main` that touches the repo redeploys. To build
   only when `site/` changes, set **Build watch paths** to include `site/*`.
5. In the project's **Custom domains**, add `dhunlive.com` and `www.dhunlive.com`.
   Cloudflare creates the DNS records and the certificate.

Preview locally:

```bash
npx http-server site -p 8787
```
