# Asset drop-in

Nothing here is required for the site to run — every slot has a designed
fallback. Drop a file at the exact path below and it takes over automatically.

## Brand
| Path | Spec | Notes |
|---|---|---|
| `brand/logo.svg` | SVG, horizontal lockup, light-on-dark | Replaces the built-in typographic wordmark in the nav and footer |
| `brand/og.jpg` | 1200 × 630 JPG | Social share card |
| `brand/favicon.ico` → put in `/app` | 32×32 | Next.js picks up `app/favicon.ico` automatically |

## Shaheen
| Path | Spec | Notes |
|---|---|---|
| `shaheen/hero-poster.jpg` | 2400 × 1600 JPG, ~250 KB after compression | First frame of the hero video, or a strong environmental portrait. Subject **right of center** — the headline sits on the left |
| `shaheen/portrait.jpg` | 1600 × 2000 JPG (4:5 vertical) | Used on the home page attorney panel and the About page |

## Video
| Path | Spec | Notes |
|---|---|---|
| `video/hero.mp4` | 1920 × 1080, H.264, **8–12 s silent loop**, target **under 4 MB** | Autoplays muted, only on 4G+ and only when the user has not asked for reduced motion. Anything larger than ~6 MB will hurt mobile conversion |
| `video/hero.webm` | optional VP9 sibling | Add a second `<source>` in `components/Hero.tsx` if you supply it |

## Practice area imagery (all optional)
`practice/<slug>.jpg` — 1200 × 1500 (4:5). Slugs:

```
truck-accidents          car-accidents        medical-malpractice
wrongful-death           slip-and-fall        nursing-home-abuse
birth-injuries           pedestrian-and-bicycle-accidents
hit-and-run
```

## Compression targets
Run everything through a compressor before committing. Hard ceilings:

- Hero poster: **250 KB**
- Portraits: **180 KB**
- Practice images: **120 KB**
- Hero video: **4 MB**

A personal injury site lives or dies on mobile load time. Someone reading this
on a phone in an ER waiting room will not wait four seconds for a hero video.
