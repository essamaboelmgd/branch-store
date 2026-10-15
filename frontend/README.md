# BRANCH frontend

An Arabic RTL React + Vite + TypeScript prototype for comparing wood-board offers and trying a local supplier portal. No API or environment variables are required.

## Run

```sh
npm install
npm run dev
```

Build static files to `dist/` with `npm run build`, or serve that build locally with `npm run preview`.

## Routes

The app uses `HashRouter`, so routes live after `#` and work on static hosts without server-side route rewrites. For example, the product list is `/#/products`.

- Store: `/`, `/products`, `/products/:id`, `/suppliers`, `/suppliers/:id`, `/compare`, `/cart`, `/checkout`, `/order-success`
- Supplier entry: `/supplier/register`, `/supplier/login`
- Supplier portal: `/supplier/dashboard`, `/supplier/products`, `/supplier/products/new`, `/supplier/products/:id/edit`, `/supplier/orders`, `/supplier/orders/:id`, `/supplier/settings`

The buyer and supplier interactions use demo state in browser `localStorage`. Clear the `branch-demo-state-v1` key to restore the seeded example data. Login, registration, stock, requests, and supplier decisions are local demonstrations only. There is no backend, payment, shipping, or request delivery. Mixed-supplier request handling is intentionally unresolved.

All supplier names, product inventory, prices, sample requests, and company details are illustrative. Prices are shown in EGP per board. Material examples do not define a final category taxonomy.

## Visual assets

The reusable BRANCH wordmark at `public/brand/branch-logo.png` is a crop from the identity-board collage supplied for this project. It preserves the original logo artwork and is stored locally. Product detail measurements are locally authored SVG diagrams.

Product cards and the storefront home page use the fixed wood-photo URLs in `src/data.ts`, served from `images.unsplash.com`. An internet connection is needed to display those photographs.

Photo sources and credits:

- [Wood boards in a warehouse](https://unsplash.com/photos/a-stack-of-wooden-boards-in-a-warehouse-BimFx6m5XqU) — Lucia Lu
- [Pile of wood](https://unsplash.com/photos/pile-of-wood-iyAHCOP-wNo) — Jonathan Borba
- [Particle board surface](https://unsplash.com/photos/close-up-of-a-textured-wooden-particle-board-surface-ej5qZ4iOlqs) — Regard Vrai IDF
- [Workshop with wooden boards](https://unsplash.com/photos/workers-in-a-workshop-with-wooden-boards-Wi2SsoPyREo) — Zoshua Colah
- [Woodworker at work](https://unsplash.com/photos/a-man-working-on-a-piece-of-wood-iXkyevQaKws) — Austin
- [Carpenter in a workshop](https://unsplash.com/photos/carpenter-working-with-wood-in-a-workshop-oW4mPEcgdEc) — qyy qyyy
- [Stack of wooden planks](https://unsplash.com/photos/a-stack-of-wooden-planks-stacked-on-top-of-each-other-6M2m1UdZvpI) — Jānis Silenieks
- [Wood panels in a studio](https://unsplash.com/photos/stacked-canvases-and-wooden-boards-in-studio-pr-N-QBK7K0) — Alican Leblebici
