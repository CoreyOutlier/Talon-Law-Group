# Talon Law Group

Marketing site for Talon Law Group — a Pittsburgh personal injury trial
practice founded by Shaheen Wallace, Esq., serving Pennsylvania, New York and
Georgia.

Replaces the previous site at wallaceinjury.com.

---

## Stack

- **Next.js 15** (App Router, TypeScript) — static-generated marketing pages
- **Tailwind CSS v4** — design tokens live in `app/globals.css` under `@theme`
- **Framer Motion** — all animation, with `prefers-reduced-motion` honored throughout

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## Where the content lives

**`lib/site.ts` is the single source of truth.** Phone number, address,
practice-area copy, case results, testimonials, the attorney bio, the process
steps and the nav all come from that one file. Edit it and the whole site
updates — no hunting through components.

### ⚠️ Before launch: two blocks in `lib/site.ts` need real data

Anything marked `status: "needs-confirmation"` is **hidden in production**. It
will not render until someone flips it to `"verified"`.

1. **`caseResults`** — one verified entry ($900,000, published in Jury Verdict
   Review). The rest are `$0` placeholders. Replace with real, documentable
   recoveries.
2. **`testimonials`** — three reviews paraphrased from public directory
   listings. Confirm exact wording and obtain client consent before publishing.

To preview the draft entries locally without publishing them:

```bash
NEXT_PUBLIC_SHOW_DRAFT_PROOF=1 npm run dev
```

Publishing an unverifiable case result or an unconsented testimonial is a
professional-conduct problem, not just a marketing one (PA RPC 7.1, NY 22
NYCRR 1200.6, GA RPC 7.1). The gate exists so that cannot happen by accident.

---

## Lead routing

The intake form posts to `POST /api/intake`. Set **one** environment variable
and leads route automatically:

```
INTAKE_WEBHOOK_URL=https://...   # Zapier, Make, your CRM, a Slack webhook
```

With nothing configured the route logs the submission and still returns 200,
so a prospective client never hits a dead end — but **the lead goes nowhere**.
Wire this before the site goes live.

---

## Assets

See [`public/media/README.md`](public/media/README.md) for exact paths, sizes
and compression ceilings. Every image and video slot has a designed fallback,
so the site is never broken while assets are outstanding.

---

## Brand

Palette and type come straight from the Outlier brand sheet and live in
`app/globals.css` under `@theme`:

| Token | Value | Role |
|---|---|---|
| `ink` | `#070707` | brand black, the ground |
| `wine` / `wine-2` | `#630330` / `#85103E` | brand maroon; `wine-2` is the lifted tint used for type on black |
| `navy` | `#083954` | secondary |
| `green` | `#0B6E4F` | secondary |
| `mist` / `steel` | `#C2CAD6` / `#8797AF` | primary and secondary text |

**Jost** carries the logotype and every header (Medium, caps, open tracking,
per the sheet). **Gill Sans** is the body face — see
[`public/media/fonts/README.md`](public/media/fonts/README.md) for the drop-in
and, importantly, the web-licensing question.

Drop the real logo at `public/media/brand/logo.svg` and it replaces the built-in
Jost lockup everywhere, automatically.

## Motion

Two systems, deliberately separated:

- **Entrances** are framer-motion (`components/Motion.tsx`: `Reveal`,
  `LineReveal`, `Counter`, `Magnetic`) or plain CSS keyframes.
- **Scroll-linked motion** — the hero drift, the pinned film sequence, the
  gallery parallax, the statement drift — is driven by `lib/scrollfx.ts`,
  which writes transforms straight to the element inside a rAF loop.

That split is not stylistic. Binding library MotionValues into `style` across
the hydration boundary crashed this page; direct writes are both correct and
faster, since scroll never touches React.

The rules:

1. **No scroll-jacking.** The scrollbar always does what the user expects.
2. **Reveal once.** Nothing re-animates on scroll-up.
3. **Subtractive motion** — masks, wipes, weight. Nothing bounces.
4. **`prefers-reduced-motion` is fully honored** — the film sequence degrades
   to a plain stacked list, the grain and cursor disappear, the intro is
   skipped.
5. **Video is conditional** — muted, `playsInline`, skipped entirely on
   save-data and sub-4G connections.

---

## SEO

- `LegalService` + `Attorney` JSON-LD in `app/layout.tsx`
- `FAQPage` JSON-LD on every practice-area page
- `app/sitemap.ts` and `app/robots.ts` generate from `lib/site.ts`
- Per-page canonical URLs and Open Graph metadata

**Domain note:** the brand is Talon Law Group but the domain is
`wallaceinjury.com`. If that domain changes, update `site.domain` in
`lib/site.ts` and put 301 redirects on every old URL — a personal injury
domain migration without redirects loses the rankings that generate the calls.
