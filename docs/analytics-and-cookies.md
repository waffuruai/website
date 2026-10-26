# Analytics, cookies and consent

How waffuru.ai decides what to load, and where each piece lives. There is one optional category, **analytics** (Google Analytics 4). Necessary storage (theme, language, the consent choice itself, the session's region) is never gated. The public description is the cookie policy at `/legal/cookies`; keep the two in step.

## What loads, by visitor

| Visitor                                                                                | Analytics (GA4)                | Banner                                 |
| -------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------- |
| EU/EEA, UK, Switzerland, Quebec (`strict`)                                             | Off until Accept               | Accept / Decline                       |
| Everywhere else (`notice`)                                                             | On by notice, opt out any time | Notice with OK / Opt out               |
| Region unknown (no answer, local dev, failed lookup, Canada without a province)        | Treated as `strict`            | Accept / Decline                       |
| Any visitor sending Global Privacy Control (`navigator.globalPrivacyControl === true`) | Off                            | None (the settings dialog explains it) |

- The banner can be closed with its X or Escape. That records nothing: a strict visitor stays opted out and is asked again next visit; a notice visitor keeps what applies by notice.
- "Cookie settings" in the footer opens a dialog with the analytics switch and Save. The switch starts from what is in effect right now (the stored choice, else what the region implies), never from a preselected yes. Nothing changes until Save.
- An OK on the notice (an `implied` record) only counts where notice is enough. If the same browser later shows up in a strict region, it is asked again. An explicit Accept or Decline travels with the browser.

## The flow

1. **Region.** The client calls `GET /api/geo` (`worker/geo.ts`, from Cloudflare's edge metadata: `{ country, region }`, never cached, nothing stored server side). The answer is validated by `parseGeo()` (`src/lib/visitor-geo.ts`) and cached for the session in `sessionStorage['waffuru:geo']`. Local dev has no `/api/geo`, so it is always `unknown` (strict).
2. **Tier.** `consentTier()` (`src/lib/consent.ts`) maps country and region to `strict`, `notice` or `unknown`. `impliedConsent()` gives the default for a `notice` visitor.
3. **Choice.** `localStorage['waffuru:consent']` holds `{ analytics, source: 'explicit' | 'implied' | 'gpc', version, ts }`. Bump `CONSENT_VERSION` (currently 1) to re-prompt everyone, for example after adding a second category. Records of another version or shape are ignored.
4. **Global Privacy Control** forces analytics off and writes a `gpc` record. That record lapses when the signal goes away, so the visitor is asked again.
5. **Mount.** `<Analytics />`, `<CookieBanner />` and `<CookieSettingsDialog />` are mounted once in `src/app/[locale]/layout.tsx`, inside `<DictionaryProvider>`. `<Analytics />` renders nothing; it resolves the region and drives GA.
6. **GA bootstrap, no inline script.** In a production build with a valid id, `initAnalytics()` (`src/lib/analytics.ts`) runs from the component's effect. From bundled code it defines `window.dataLayer` and `gtag`, queues the Consent Mode v2 defaults (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` all `denied`, `wait_for_update: 500`), then `js` and `config`, and sets `window['ga-disable-<id>'] = true`. Nothing is requested.
7. **Consent granted** (Accept, a stored yes, or a notice region): `grantAnalytics()` sends `gtag('consent', 'update', { analytics_storage: 'granted' })` and re-enables collection. Once the page has settled (`useSettled`: loaded, then the first scroll, tap, key or pointer move, or 3 seconds), `loadGtag()` injects `https://www.googletagmanager.com/gtag/js?id=<id>` as an external `<script src>`. `loadGtag()` itself refuses without consent. Events queued in `dataLayer` are sent when it runs. A visitor who leaves before the page settles is not counted.
8. **Page views** are sent by hand (`send_page_view: false`): on load, on every client navigation, and when consent is first granted. They report `page_path` (the public path: the build's `/en` prefix is stripped with `splitLocale()`, so `/en/about` is `/about`, while `/ja/about` stays), `page_location`, `page_title`, and `page_language` (the page's BCP 47 tag, for example `zh-CN`). `page_language` is an event parameter; register it as a custom dimension in GA4 admin to see it in reports.
9. **Consent withdrawn** (Decline, Opt out, GPC, or a strict region with no answer): `revokeAnalytics()` sends the update to `denied`, sets `ga-disable-<id>` (Google's documented opt-out switch, so an already loaded gtag.js collects nothing), and deletes `_ga` and `_ga_*` cookies on the current host and every parent domain. `trackEvent` and `trackPageView` also check consent themselves, so nothing is queued while it is off.

`GA_CONFIG` holds the settings that apply in every tier: `allow_google_signals: false`, `allow_ad_personalization_signals: false`, `cookie_expires` of 13 months, `send_page_view: false`. Advertising features, remarketing and conversion pixels are not used.

## Where things live

| File                                                | Role                                                                                                |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/lib/consent.ts`                                | Tiers, GPC, the stored record, the external store (`useSyncExternalStore`), banner and dialog state |
| `src/lib/visitor-geo.ts`                            | `Geo` type and validation of the `/api/geo` answer                                                  |
| `src/lib/analytics.ts`                              | GA gating, bootstrap, loader, grant/revoke, cookies, `trackPageView`, `trackEvent`                  |
| `src/lib/use-settled.ts`                            | Holds gtag.js back until the page settles                                                           |
| `src/components/providers/analytics.tsx`            | The effects that wire consent to GA                                                                 |
| `src/components/consent/cookie-banner.tsx`          | The banner                                                                                          |
| `src/components/consent/cookie-settings-dialog.tsx` | The settings dialog (shadcn Dialog and Switch)                                                      |
| `src/components/consent/cookie-settings-button.tsx` | The footer "Cookie settings" control                                                                |
| `src/i18n/dictionaries/*.ts`                        | The `consent` block (all six locales)                                                               |
| `worker/geo.ts`, `worker/headers.ts`                | `/api/geo` and the CSP                                                                              |

## Environment

| Variable            | Used for                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_GA_ID` | The GA4 measurement id. Must match `/^G-[A-Z0-9]+$/`; a missing or malformed value (or `UA-…`) turns GA off completely. Inlined at build time, so it must be present when `mise run build` runs. |

- **Production:** set the repository variable `NEXT_PUBLIC_GA_ID` (Settings, Secrets and variables, Actions, Variables) and pass it to the build step as `env: NEXT_PUBLIC_GA_ID: ${{ vars.NEXT_PUBLIC_GA_ID }}`.
- **Locally:** put it in `.env.local` (git-ignored). `.env.example` lists it.
- GA runs only when `process.env.NODE_ENV === 'production'` AND the id is valid AND analytics consent is granted. `mise run dev` never loads GA, whatever the id.
- Localhost is not blocked (we verify with a production build served locally). When `location.hostname` is `localhost` or `127.0.0.1`, `config` carries `debug_mode: true`, so test hits land in GA4 DebugView, not in the live reports.

## Content Security Policy

`worker/headers.ts` builds the CSP. The GA hosts it allows, and why:

| Directive     | Host                                                                                                 | For                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `script-src`  | `https://www.googletagmanager.com`                                                                   | `gtag/js` (and the `gtag/destination` file it pulls in) |
| `connect-src` | `https://*.google-analytics.com`, `https://*.analytics.google.com`, `https://*.googletagmanager.com` | `/g/collect` hits, including regional endpoints         |
| `img-src`     | `https://*.google-analytics.com`, `https://*.googletagmanager.com`                                   | Image-beacon fallback                                   |

There is no inline script anywhere in this flow: `gtag`, `dataLayer` and the consent defaults come from bundled code, and gtag.js is an external script. Do not add `<Script>` with children or `dangerouslySetInnerHTML`; the CSP only lets scripts run that carry the per-request nonce the Worker stamps on the built HTML (and what those load, via `'strict-dynamic'`).

## Verify locally

1. Put `NEXT_PUBLIC_GA_ID=G-CJS2GCF4EQ` in `.env.local`.
2. Run `mise run preview` (builds, assembles and runs the real Worker at http://127.0.0.1:8787; add `--port` if taken). `wrangler dev` answers `/api/geo` with where you really are (for example `{"country":"CA","region":"AB"}`), so you may land in a notice region: the banner then reads OK / Opt out and analytics is already on by notice (step 4 happens by itself). To force a tier, run this in the console, then reload: `localStorage.clear(); sessionStorage.setItem('waffuru:geo', JSON.stringify({ country: 'DE', region: null }))` for strict (Accept / Decline), or `country: 'US'` for notice.
3. Open DevTools, Network tab. Before you answer the banner there must be **no** request to `googletagmanager.com` or `google-analytics.com`.
4. Click **Accept** (or **OK** in a notice region). Move the pointer or scroll. You should see `gtag/js?id=G-CJS2GCF4EQ` from `www.googletagmanager.com`, then `/g/collect` requests (a `page_view`), and `_ga` / `_ga_CJS2GCF4EQ` cookies. Open GA4, Admin, DebugView: the hit shows up there (`debug_mode` is on at 127.0.0.1) with `page_path` and `page_language`. Navigate to another page for a second `page_view`.
5. Open **Cookie settings** in the footer, turn Analytics off, Save (or use **Opt out** on the notice). No further `/g/collect` requests are sent and the `_ga*` cookies are gone.
6. Reload with `localStorage['waffuru:consent']` cleared and click **Decline**: no requests at all.
7. With Global Privacy Control on (Firefox: `privacy.globalprivacycontrol.enabled`, or DuckDuckGo/Brave), there is no banner and no requests.
8. `mise run dev` (any id, any consent): the banner works, but there is no `window.gtag` and no GA request, because `NODE_ENV` is not `production`.
9. Remove the id (or break it, for example `UA-1`): production build, nothing loads either.

`mise run test` covers the gating (no gtag.js without consent, nothing when `NODE_ENV` is not production or the id is missing or malformed, `debug_mode` on localhost, `page_view` paths).

## Changing things

- **Add a second category (ads, a pixel, chat):** add it to `ConsentCategories` and `StoredConsent` in `src/lib/consent.ts`, give it a switch in the settings dialog and its dictionary strings in all six locales, gate its loader the same way as `loadGtag()`, add its hosts to the CSP, update the cookie policy, and bump `CONSENT_VERSION`.
- **Change which regions need opt-in:** edit `STRICT_COUNTRIES` (or the Quebec rule) in `src/lib/consent.ts`, update `worker/geo.ts` comments, the cookie policy, and the table above.
- **Track a UI event:** call `trackEvent({ category, action, label })` from `src/lib/analytics.ts`. It does nothing without consent, so call it unconditionally.
- **Swap the measurement id:** change the repository variable and redeploy; the id is inlined at build time.
