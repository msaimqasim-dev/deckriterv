DeckRite RV home page - image assets
====================================
Every image on the home page was downloaded from the client's own site,
https://deckriterv.com/img/  (no stock or AI photos are used).

originals/   untouched downloads
  header/interiors-slider-1920.jpg -> hero, RV Interiors card
  header/sport-slider-1920.jpg     -> Toy Hauler Garages card
  header/ramp-slider-1920.jpg      -> Ramps & Patio Decks card, CTA background
  swatches/tan-jute.jpg            -> ULTRA Woven PVC sample
  swatches/gray-plank.jpg          -> DeckRite Plank sample
  swatches/raised-black-coin.jpg   -> Shield RV raised-coin sample

*.jpg in this folder are the processed versions (cropped / resized).
The header originals have a dark panel with baked-in title text on the
left half, so only the right half (the real photo) is used.

index.ts holds the same images as base64 data URIs. The site builds to ONE
file (dist/index.html), so images must live inside the bundle - separate
/images/... files are not served and would show as broken.

To swap in better photography: replace a file in this folder, then
re-encode it into index.ts (export name = camelCase of the file name).
