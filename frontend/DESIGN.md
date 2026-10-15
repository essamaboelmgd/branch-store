# BRANCH interface notes

This React prototype presents BRANCH as an Arabic RTL marketplace for wood boards. The supplied identity-board collage is the source for the reusable BRANCH logo at `public/brand/branch-logo.png`; the horizontal logo was cropped from the provided artwork and its pale background made transparent without redrawing it. The English BRANCH wordmark and “Wood Marketplace” line remain part of the asset.

The interface uses the forest green, wood brown, sand, and warm neutral colors shown on the supplied board. Arabic typography uses available system sans-serif families with fallbacks; no font files are bundled. Product cards and the storefront use the fixed Unsplash image URLs in `src/data.ts`; product detail views use locally authored SVG measurement diagrams rather than product photographs.

The storefront prioritizes finding and comparing wood boards. Supplier discovery follows as a secondary path. Supplier sign-in, registration, inventory, company settings, and order decisions are local demonstrations. Buyer and supplier data are saved in browser `localStorage`.

## Image sources

- `public/brand/branch-logo.png` is the locally stored crop from the BRANCH identity-board image supplied by the user.
- Storefront and product-card photography is served remotely from `images.unsplash.com`. See `frontend/README.md` for the mapped photo references and credits. Those images require an internet connection; the logo and SVG diagrams do not.
