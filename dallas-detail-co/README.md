# Dallas Detail Co. — Spec Site (Metro Template #1)

A production-grade, **brandable** auto-detailing landing site, built to be leased to a local
detailer. Pure static HTML/CSS/JS — no build step, deploys anywhere (Railway, Vercel, Netlify,
Cloudflare Pages, S3). Fast, SEO-optimized, fully responsive.

This is **Template #1** in the per-metro spec-site model: build generic geo-branded sites, rank
them, then lease to a detailer in that market who keeps paying monthly.

## Files
- `index.html` — the full one-page site (semantic + JSON-LD schema)
- `styles.css` — "Liquid Obsidian" theme (obsidian + sapphire + brushed gold)
- `script.js` — before/after slider, mobile nav, scroll reveals, count-up stats, FAQ
- `assets/` — drop `og.jpg` (1200×630 social preview) + real photos here

## Preview locally
From the project root (`NYN-Websites-Detailers`):
```
npx serve dallas-detail-co -l 4321
```
Then open http://localhost:4321  (or just double-click index.html).

---

## Design strategy applied (from the benchmark report)
This site deliberately does the 3 things even the top-5 competitors neglect together:
1. **Interactive before/after slider above the fold** (the industry-wide gap / our wedge)
2. **Transparent pricing** (3 tiers with real prices)
3. **Structure ready for a blog** (add `/blog` for long-tail SEO)

Plus the table-stakes winners share: online-book CTA everywhere, live rating + review count,
brand certifications, service-area block, deep service sections, LocalBusiness + FAQ schema.

---

## REBRAND CHECKLIST (to flip this to a real detailer)
Find-and-replace these tokens across `index.html` (and the matching JSON-LD):

| Token / placeholder | Replace with |
|---|---|
| `Dallas Detail Co.` | Detailer's business name |
| `(469) 555-0117` / `+14695550117` | Real phone (update `tel:` links too) |
| `book@dallasdetailco.com` | Real email |
| `0000 Commerce St ... 75201` | Real street address + ZIP |
| `dallasdetailco.com` (canonical/OG/schema) | Real domain |
| `4.9` / `327` reviews | Their real Google rating + count |
| `Est. 2014` / `11 yrs` / `12,000+` stats | Their real numbers |
| Prices ($129/$289/$1,199 etc.) | Their actual package prices |
| Hero/gallery Unsplash image URLs | **Their real before/after + work photos** |
| Reviews (Marcus T., Sofia R., Derek P.) | Real Google review quotes |
| Service-area tags | Their actual coverage cities |

> ⚠️ **Images are demo placeholders** pulled from Unsplash. Swap in the detailer's real
> before/after photos before launch — real local photos are the #1 conversion + trust driver.

## Per-metro duplication playbook
1. Copy this folder → `houston-detail-co`, `phoenix-detail-co`, etc.
2. Swap all "Dallas / DFW / TX" geo references + service-area cities.
3. Update the LocalBusiness JSON-LD (city, geo coords, areaServed).
4. Generate generic before/after + a few stock work shots (or buy a stock pack).
5. Register a clean geo-exact-match domain (e.g. `houstondetailco.com`).
6. Deploy, submit to Google Search Console, build a few local citations.
7. Once it ranks / gets calls, lease it to a local detailer on a monthly plan.

## Recommended next upgrades
- Real **online booking** embed (Square Appointments / Calendly / Cal.com) on the `#book` CTA.
- A **`/blog`** with 6–10 articles ("ceramic vs PPF", "ceramic coating cost Dallas", etc.).
- Per-service + per-city sub-pages (the Chicago Auto Pros internal-link mesh) for deeper SEO.
- A lightweight lead form (Formspree / Netlify Forms) capturing name + vehicle + service.
- `sitemap.xml` + `robots.txt`.
