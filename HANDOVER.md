# Là Fuori — Handover Document

## Project Overview

**Là Fuori** is a luxury fashion e-commerce platform built with React 18 + TypeScript + Vite. It features a 7-step Guided Discovery Journey ("The Occasion Edit"), a product catalogue, search, wishlist, cart, and checkout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 (`@theme` directive in `index.css` — no `tailwind.config.js`) |
| State | Zustand with `persist` middleware (localStorage key: `lafuori-storage`) |
| Routing | React Router v6 |
| Fonts | Cormorant Garamond (serif), Josefin Sans (sans) via Google Fonts |

### Important: Tailwind v4

This project uses Tailwind CSS v4. Custom design tokens are defined via `@theme` in `src/index.css`, not in a config file. Do not create `tailwind.config.js`.

---

## Brand Tokens

The Guided Journey and most pages use inline style brand tokens defined at the top of `GuidedJourney.tsx`:

```ts
const T = {
  ivory:     '#FAF7F1',   // page background
  beige:     '#F5EFE6',   // section backgrounds, card accents
  parchment: '#F0EBE3',   // tertiary surface
  border:    '#DED6C8',   // all borders
  gold:      '#C8A66A',   // primary accent, selected state
  goldMid:   'rgba(200,166,106,0.45)',
  ink:       '#1F1F1F',   // headings, primary text
  mid:       '#7A6E64',   // secondary text
  muted:     '#A89E94',   // tertiary text, tags
};
```

CSS theme variables (used by Tailwind classes like `bg-ivory`, `text-gold`) are in `src/index.css` under `@theme`.

---

## File Map

```
src/
├── App.tsx                      — Router, all routes
├── AppLayout.tsx                — Navbar + Outlet + Footer wrapper
├── main.tsx                     — React entry point
├── store.ts                     — Zustand store (cart, wishlist, currency, search)
├── data.ts                      — Product catalogue (CAT[]) + scoreOccasion()
├── vite-env.d.ts                — Vite types (required for import.meta.env)
├── index.css                    — Tailwind v4 @theme tokens + journey animations
├── lib/
│   └── utils.ts                 — formatPrice(), getBudgetLabel(), CURRENCY_META, CurrencyCode
├── components/
│   ├── Layout.tsx               — Navbar (with NavCurrencyDropdown), Footer
│   ├── ProductCard.tsx          — Shared product card
│   ├── ProjectImpactModal.tsx   — Footer modal
│   ├── SearchOverlay.tsx        — Global search UI
│   └── SizeChartModal.tsx       — Size chart modal
└── pages/
    ├── Home.tsx
    ├── Shop.tsx                  — Catalogue with filters
    ├── GuidedJourney.tsx        — 7-step Occasion Edit (main feature)
    ├── OccasionEdit.tsx
    ├── ProductDetails.tsx
    ├── Cart.tsx
    ├── Checkout.tsx
    └── Wishlist.tsx
```

---

## Routes

| Path | Component |
|---|---|
| `/` | `Home` |
| `/shop` | `Shop` |
| `/journey` | `GuidedJourney` |
| `/edit` | `OccasionEdit` |
| `/product/:id` | `ProductDetails` |
| `/cart` | `Cart` |
| `/checkout` | `Checkout` |
| `/wishlist` | `Wishlist` |

---

## Currency System

Supported currencies: `USD | INR | EUR | GBP | AED | SGD | AUD | CAD | JPY | CHF | BOTH`

- Defined as `CurrencyCode` type in `src/lib/utils.ts`
- Also declared inline in `src/store.ts` (structurally identical)
- `BOTH` mode displays `$X / ₹Y` — exists for backwards compatibility with cart/checkout
- `formatPrice(price: number, currency: CurrencyCode)` — converts USD base price using fixed rates
- `getBudgetLabel(opt, currency)` — converts budget option strings (`'Under $1,000'` etc.) to local currency for display only; the stored answer key never changes (scoring always uses USD keys)
- `CURRENCY_META` array — all 11 currencies with code, name, symbol

The navbar has a `NavCurrencyDropdown` (in `Layout.tsx`). The journey has its own `CurrencyDropdown` (inline in `GuidedJourney.tsx`) shown only on the budget step.

---

## Guided Journey — Architecture

File: `src/pages/GuidedJourney.tsx`

### Step structure

```ts
const steps = [
  { id: 'occasion',   title: '...', options: [...6 options] },
  { id: 'timeOfDay',  title: '...', options: [...3 options] },
  { id: 'location',   title: '...', options: [...5 options] },
  { id: 'mood',       title: '...', options: [...6 options] },
  { id: 'budget',     title: '...', options: [...3 options] },
  { id: 'colour',     title: '...', options: [...6 options] },
  { id: 'silhouette', title: '...', options: [...7 options] },
];
```

Total: 35 option cards across 7 steps.

### STEP_META

Each step has a `subtitle` and a `cards` map keyed by option text. Each card has:
- `img`: Unsplash URL (`?auto=format&fit=crop&w=600&h=800&q=80`)
- `tag`: 3–4 word editorial descriptor

**Image policy**: All images are non-human — venues, interiors, textures, architecture, landscapes. No fashion models or people.

### Selection logic

- Up to 2 selections per step
- If 2 already selected and user picks a 3rd, oldest is dropped (FIFO)
- Deselect by tapping a selected card
- Continue button disabled until ≥1 selection

### Scoring engine (`getResults`)

Products from `CAT[]` are scored based on answers:
- `occasion` → `scoreOccasion(product, key)` from `data.ts`
- `timeOfDay` → `+10` per context match
- `location` → `+10/+15` per context match
- `mood` → `+15` per context match; `+10` for bold/vibrant heuristic
- `budget` → `calculateBudgetScore`: `+15` match, `-10` mismatch
- Products with score ≤ 20 are filtered out

Result slots: Best Match (neutral/minimal), Strong Match ×2 (statement + romantic), Alternative Pick. Up to 4 results shown.

### Save/restore edits

- Saved to `localStorage['saved_edits']` as `{ id, summary, answers }`
- "Saved Edits" modal on results page allows reopening or deleting

---

## Animations

Defined in `src/index.css`:

```css
.journey-reveal   — step container entrance (translateY + fade, 0.55s)
.journey-card-in  — individual card stagger (scale + translateY + fade, 0.5s)
```

Cards use `animationDelay: cardIdx * 60ms` for stagger effect.

---

## Known Issues / Notes

### Node not in PATH
The system has Brackets' bundled Node v6 at `C:\Program Files (x86)\Brackets\node.exe` but this is too old. Node LTS (v24) was installed via winget but may not be on PATH in all shell sessions. If `npx` is not found, add Node's install directory to PATH or restart the terminal.

To verify: `where.exe node` — should show `C:\Program Files\nodejs\node.exe` or similar.

### TypeScript filter key bug (Shop.tsx)
When mapping active filters to `<span key={...}>`, TypeScript infers `keyof typeof filters` as potentially `symbol`. Fixed with:
```tsx
key={String(f.category) + '-' + f.value}
```
Do not revert to template literals — this causes TS2731.

### vite-env.d.ts
Was missing from the project. Created at `src/vite-env.d.ts` with `/// <reference types="vite/client" />`. Required for `import.meta.env` in `App.tsx`.

### BOTH currency
`formatPrice(price, 'BOTH')` hardcodes INR as `price * 83` rather than using the `RATES` lookup. This is intentional — BOTH mode is legacy and the hardcoded rate keeps display consistent with the scoring system's budget thresholds.

---

## Development Setup

```bash
npm install
npm run dev       # Vite dev server, usually http://localhost:5173
npm run build     # Production build
npx tsc --noEmit  # Type check only
```

Requires Node 18+. The project does not have a `.nvmrc` or `engines` field.

---

## What Was Changed in the Last Session

1. **`src/lib/utils.ts`** — Expanded `CurrencyCode` from 3 values (`USD|INR|BOTH`) to 11. Added `RATES`, `LOCALES`, `CURRENCY_META`, `getBudgetLabel`. `formatPrice` now handles all currencies.

2. **`src/store.ts`** — Updated currency union type and `setCurrency` signature to match the 11-currency `CurrencyCode`.

3. **`src/components/Layout.tsx`** — Added `NavCurrencyDropdown` component (click-outside aware, ivory theme). Replaced the 3 plain currency buttons in `Navbar` with this dropdown.

4. **`src/pages/GuidedJourney.tsx`** — Full visual redesign of the 7-step journey:
   - Image-driven editorial card layout (2:3 aspect ratio, hover zoom, warm ivory overlay)
   - Roman numeral step indicator (I–VII)
   - Sticky frosted-ivory navigation bar
   - `CurrencyDropdown` component (shown on budget step only)
   - `STEP_META` with 35 unique Unsplash images — non-human, keyword-matched
   - All logic (scoring, selection, save/restore) preserved exactly

5. **`src/pages/Shop.tsx`** — Fixed TS2469 key type error on filter chips.

6. **`src/vite-env.d.ts`** — Created (was missing).

7. **`src/index.css`** — Added `journeyReveal` and `journeyCardIn` keyframe animations.
