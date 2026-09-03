# Talon Law Group

Marketing site for Talon Law Group — a Pittsburgh personal injury trial
practice founded by Shaheen Wallace, Esq., serving Pennsylvania, New York and
Georgia.

Replaces the previous site at wallaceinjury.com.

---

## Stack

- **Next.js 15** (App Router, TypeScript) — static-generated marketing pages
- **Tailwind CSS v4** — design tokens live in `app/globals.css` under `@theme`
- **Framer Motion** — all animation, with `prefers-reduced-motion` honoured throughout

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

## Motion doctrine

The animation here is deliberate and rule-bound:

1. **No scroll-jacking.** The scrollbar always does what the user expects.
2. **Reveal once.** Nothing re-animates on scroll-up.
3. **Subtractive motion** — masks, fades and weight. Nothing bounces.
4. **`prefers-reduced-motion` is fully honoured**, including the grain overlay.
5. **Video is conditional** — muted, `playsInline`, skipped entirely on
   save-data and sub-4G connections.

`components/Motion.tsx` holds the primitives (`Reveal`, `LineReveal`,
`Counter`, `Magnetic`). Use them rather than writing one-off animations.

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
