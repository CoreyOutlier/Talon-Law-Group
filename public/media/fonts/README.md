# Fonts

The brand sheet specifies **Jost** for headers and **Gill Sans** for body copy.

- **Jost** is loaded automatically from Google Fonts. Nothing to do.
- **Gill Sans** is not a web font. Drop the converted files here and the whole
  site switches body typeface with no code change.

## Drop these in

| Filename | From your folder |
|---|---|
| `sans-regular.woff2` | `Gill Sans.otf` |
| `sans-medium.woff2` | `Gill Sans Medium.otf` |
| `sans-semibold.woff2` | `Gill Sans Bold.otf` |
| `display.woff2` | *(optional)* `GillSans Condensed.otf` — only if you want Gill on headers instead of Jost |
| `display-italic.woff2` | *(optional)* `Gill Sans Italic.otf` |

Until `sans-regular.woff2` exists, body copy falls back to any locally
installed Gill Sans, then to Jost. Nothing looks broken either way.

## Converting the .otf files

Browsers cannot load `.otf` reliably. Convert free at **transfonter.org**:

1. Add `Gill Sans.otf`, `Gill Sans Medium.otf`, `Gill Sans Bold.otf`
2. Formats: **WOFF2** only
3. Subsets: **Latin**
4. Convert, download, rename per the table above, drop them in this folder

`.woff2` is about a third the size of `.otf` — on a personal injury site the
body font is on the critical render path, so this matters.

## Licensing — read this before launch

Gill Sans is a Monotype font. **Desktop `.otf` licenses do not cover
`@font-face` web embedding.** A separate web license is required, and Monotype
does audit law firm sites. Two clean options:

1. Buy the Gill Sans web license from Monotype, or
2. Use **Jost** everywhere — it is open source, already loaded, and sits in the
   same geometric-humanist family as the logotype. Delete nothing; just leave
   this folder empty and the site is fully licensed as-is.

Option 2 is free and defensible. Option 1 is only worth it if Shaheen
specifically wants Gill Sans in body copy.
