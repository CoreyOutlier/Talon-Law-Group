# Fonts

Both faces load automatically from Google Fonts. **Nothing needs to go in this
folder for the site to be correct and fully licensed.**

| Role | Face | Why |
|---|---|---|
| Headers, logotype | **Jost** | Specified on the brand sheet. Geometric, matches the logotype. |
| Body copy | **Cabin** | Stand-in for Gill Sans — see below. |

## Why not Gill Sans

Gill Sans is a Monotype face. A desktop `.otf` license does **not** cover
`@font-face` web embedding, and Monotype audits law firm sites. Buying the web
license is possible but not worth it here.

**Cabin** was drawn directly from Eric Gill's and Edward Johnston's humanist
sans work — the same lineage Gill Sans comes from. It is open source, free to
embed, and holds the same warmth at paragraph sizes. Nobody outside a type
studio will clock the difference.

## If you ever do buy the Gill Sans web license

Convert the files to `.woff2` (transfonter.org — WOFF2 only, Latin subset),
drop them here with these exact names, and they take over automatically with
no code change:

```
sans-regular.woff2     Gill Sans.otf
sans-medium.woff2      Gill Sans Medium.otf
sans-semibold.woff2    Gill Sans Bold.otf
```

The CSS already points at them and falls through to Cabin when absent.
