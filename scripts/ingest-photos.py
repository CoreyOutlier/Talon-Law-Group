#!/usr/bin/env python3
"""
Ingest a photo drop.

Drop any number of photos into public/media/shaheen/_incoming/ (any filenames,
any sizes) and run:

    python3 scripts/ingest-photos.py

Every file is resized, compressed to the ceilings in public/media/README.md,
sorted by orientation, and written to public/media/shaheen/_ready/ with a
predictable name. Originals are left untouched.

Then assign the ones you want to the live slots:

    hero-poster.jpg   wide, subject right of centre — the headline sits left
    portrait.jpg      4:5 vertical — attorney panel and About page
    film-1..3.jpg     wide — the pinned scroll sequence
    gallery-1..7.jpg  3:4 vertical — the parallax contact sheet

Requires Pillow:  pip install Pillow
"""
import sys, pathlib
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "public/media/shaheen/_incoming"
OUT = ROOT / "public/media/shaheen/_ready"

# (max long edge, jpeg quality, target ceiling in KB)
WIDE     = (2400, 82, 300)
VERTICAL = (1600, 82, 200)

def process(path: pathlib.Path, index: int) -> str | None:
    try:
        img = Image.open(path)
    except Exception as e:
        print(f"  skip {path.name}: {e}")
        return None

    img = ImageOps.exif_transpose(img).convert("RGB")
    w, h = img.size
    wide = w >= h
    long_edge, quality, ceiling = WIDE if wide else VERTICAL

    if max(w, h) > long_edge:
        scale = long_edge / max(w, h)
        img = img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

    name = f"{'wide' if wide else 'tall'}-{index:02d}.jpg"
    dest = OUT / name

    # Step the quality down until it fits the ceiling.
    for q in range(quality, 54, -6):
        img.save(dest, "JPEG", quality=q, optimize=True, progressive=True)
        if dest.stat().st_size <= ceiling * 1024:
            break

    kb = dest.stat().st_size // 1024
    print(f"  {path.name}  ->  {name}  {img.size[0]}x{img.size[1]}  {kb}KB")
    return name

def main() -> int:
    if not SRC.is_dir():
        SRC.mkdir(parents=True, exist_ok=True)
        print(f"Created {SRC.relative_to(ROOT)} — drop photos in it and re-run.")
        return 0

    files = sorted(
        p for p in SRC.iterdir()
        if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff"}
    )
    if not files:
        print(f"No images in {SRC.relative_to(ROOT)}.")
        return 0

    OUT.mkdir(parents=True, exist_ok=True)
    print(f"Processing {len(files)} file(s)...")
    made = [process(p, i) for i, p in enumerate(files, 1)]
    made = [m for m in made if m]

    wide = [m for m in made if m.startswith("wide")]
    tall = [m for m in made if m.startswith("tall")]
    print(f"\nDone. {len(wide)} wide, {len(tall)} vertical -> {OUT.relative_to(ROOT)}")
    print("Assign them to the live slots listed at the top of this script.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
