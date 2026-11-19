MENU PHOTOS — STATUS
=====================

The 5 catering menu packages in src/data/predefinedMenus.js now use real
supplied banana-leaf images, converted from the original PNGs to WebP
(see scripts/convert-menu-photos.mjs):

  grand-dinner-mega.webp          <- South Indian Banana Leaf Feast-1.png
  royal-lunch-mega.webp           <- Festive South Indian Banana Leaf Feast-2.png
  premium-dinner-special.webp     <- South Indian Feast on a Banana Leaf-3.png
  signature-dinner-feast.webp     <- South Indian Feast on a Banana Leaf-4.png
  traditional-dining-special.webp <- Traditional South Indian Banana Leaf Feast-5.png

The 5 original "...-N.png" files are kept here as the source reference
images (not referenced by the site directly).

⚠ IMPORTANT — these are AI-generated representative images, not real
photographs of an actual Madhava Catering Services event. The site shows
a disclaimer to this effect on every menu detail page; do not remove it
or present these as genuine event photography.

⚠ DUPLICATE PHOTOGRAPHY — on inspection, these 5 images are only 3
visually distinct meals:
  - image 1 (Grand Dinner Mega Menu) and image 4 (Signature Dinner Feast)
    show the same meal from a different angle (as the business itself
    suspected).
  - image 2 (Royal Lunch Mega Menu) and image 5 (Traditional Dining
    Special) ALSO appear to show the same meal/shoot (not flagged by the
    business, found on review) — nearly identical dish layout, just a
    different table/background.
  - image 3 (Premium Dinner Special) is the only genuinely distinct photo.
Confirm with the business whether these 5 names should really be 5
visually-distinct packages — if so, 2 more photo shoots (or real event
photography) are needed before real launch. Each affected menu entry in
predefinedMenus.js has a `photoSharedWith` field pointing at its pair,
and the site shows a small notice about it on the affected detail pages.

DISH LISTS — every category/item list was inferred by visually reviewing
these photographs, not confirmed by the business. Items the business's
own brief marked "(verify)" are stored with `verified: false` and shown
with a "to confirm" badge on the site. Confirm the real dish lists (and
whether each listed item is correct) before treating any of this as
final package contents.

No prices are set — none were supplied.
