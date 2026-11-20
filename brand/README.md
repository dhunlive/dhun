# Dhun brand

## The mark

A lowercase **d** drawn as a **quaver**. The round bowl is the note head, the stem is the
letter's upright, and the flag turns it into music. *Dhun* means melody, so the one shape
says both the name and the product. It is two strokes on a 1024 grid, which is why it
holds up from a 1024 store icon down to a 24px favicon.

## Files

| File | Use it for |
|---|---|
| `dhun-icon.svg` | The app icon, full-bleed square. Stores and launchers add their own mask |
| `dhun-icon-rounded.svg` | The icon shown as-is: the website, documents, social profiles |
| `dhun-lockup.svg` | Icon plus "dhun", on light backgrounds |
| `dhun-lockup-on-dark.svg` | The same, on dark backgrounds |
| `dhun-wordmark.svg` | "dhun" alone, outlined, so it renders identically without the font |
| `dhun-mark-rose.svg` / `dhun-mark-white.svg` | The mark with no tile, one colour |
| `android-foreground.svg` / `android-background.svg` | The Android adaptive icon's two layers |
| `play-store-icon-512.png` | The Play Console listing icon, 512 × 512 |

The app's PNGs in `mobile/assets/images/` are renders of these:

| PNG | From | Size |
|---|---|---|
| `icon.png` | `dhun-icon.svg` | 1024 |
| `android-icon-foreground.png` | `android-foreground.svg` | 512, transparent |
| `android-icon-background.png` | `android-background.svg` | 512 |
| `android-icon-monochrome.png` | `android-foreground.svg` | 432, transparent (Android 13 themed icons) |
| `splash-icon.png` | `dhun-mark-white.svg` | 512, transparent, on a `#E8466B` splash |
| `favicon.png` | `dhun-icon-rounded.svg` | 48 |
| `brand-mark.png` | `dhun-icon-rounded.svg` | 128, used by `visuals/BrandMark.tsx` |

`site/favicon.svg` is a copy of `dhun-icon-rounded.svg`.

To re-render after changing an SVG, load it in Chrome at the target size with a transparent
background, for example a 1024px page holding the SVG at 100% with
`--force-device-scale-factor=<size/1024>` and `--default-background-color=00000000`. The
icons change only with a new native build, never an OTA update.

## Colours

| | Hex | Where |
|---|---|---|
| Tile, top left | `#FF7A93` | Gradient start |
| Tile, bottom right | `#D92F52` | Gradient end |
| Solid rose | `#E8466B` | Splash, adaptive icon fallback: the gradient's midpoint |
| Brand rose | `#FF4D6D` | The app's `rose.500`, for fills |
| Ink | `#231A14` | The wordmark on light |
| Ivory | `#FFF2E4` | The wordmark on dark |

## Wordmark

"dhun", lowercase, in **Fraunces** at weight 800, optical size 144, tracked −0.02em: the
same face the website uses for headings. Always lowercase. In a Hindi context the name is
still written **Dhun** in Latin, as the app does.

## Don't

- Don't rotate, outline or add a shadow to the mark, or put it on a busy photo without its
  tile.
- Don't recolour the tile. On a rose or dark ground, use the white mark with no tile.
- Don't redraw the wordmark in another font.
- Keep clear space around the icon of at least a quarter of its width.
