# Circuit & Co. — Mini E-Commerce Checkout (Frontend)

React + Vite frontend for the Mini E-Commerce Checkout System assignment. Covers product
listing with real product photos, a persistent cart, env-driven coupons, a delivery-address
step, a Stripe Checkout handoff via `/api/checkout`, order history with a real cancellation
flow, and a wishlist.

## Run it

```bash
npm install
cp .env.example .env   # already done for you — edit to add/remove coupons
npm run dev
```

Opens on `http://localhost:5173`. The dev server proxies any `/api/*` call to
`http://localhost:4000` (see `vite.config.js`) — point that at your Express/Stripe backend,
or change the port.

```bash
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## What's included

- **Product listing** — Wireless Mouse (₹999), Mechanical Keyboard (₹2,499), USB-C Hub
  (₹1,499), each with a real photo (freely licensed, Unsplash), star rating, name, price,
  and Add to Cart button.
- **Cart** — add/remove items, increment/decrement quantity, live subtotal + total, all
  driven by a `useReducer`-based `CartContext` (`src/context/CartContext.jsx`).
- **Coupons — configured entirely in `.env`** — every `VITE_COUPON_<CODE>=<percent>` line
  in `.env` becomes a valid code (see `src/data/coupons.js`). Add or remove coupons without
  touching any source file. Ships with `SAVE20`, `WELCOME10`, `FLAT15`, `FESTIVE25`. A
  coupon can only be applied once per order; invalid/repeat codes show inline errors.
- **Delivery address** — a dedicated checkout step (`src/pages/Checkout.jsx` +
  `src/components/AddressForm.jsx`) collects name, phone, address lines, city, state, PIN,
  and address type (Home/Work/Other), with validation, before handing off to payment.
- **Checkout** — `Checkout.jsx` records the order, then makes exactly **one** call to
  `POST /api/checkout` with the cart, coupon code, and address, and redirects the browser to
  the returned Stripe Checkout URL.
- **Result pages** — `/success` (shows the order recap and clears the cart) and `/cancel`
  ("Payment Cancelled", with a way back into checkout).
- **Order history + real cancellation** — `/orders` lists every placed order. Cancelling
  asks for a real reason (ordered by mistake, found a better price, delivery too slow,
  changed my mind, item no longer needed, other — with a free-text note) and offers to move
  the cancelled items to your wishlist instead of losing them. Orders persist in
  `localStorage` (`src/context/OrdersContext.jsx`).
- **Wishlist** — heart icon on every product card, a `/wishlist` page, persisted in
  `localStorage` (`src/context/WishlistContext.jsx`).
- **Ambient background animation** — a few slow-drifting gradient blobs behind the UI,
  disabled automatically for `prefers-reduced-motion`.

## Configuring coupons

Open `.env` and add a line per coupon:

```bash
VITE_COUPON_SAVE20=20
VITE_COUPON_WELCOME10=10
VITE_COUPON_BIGSALE=30
```

Restart `npm run dev` after editing `.env` (Vite only reads env files at startup). The
coupon code shoppers type in is whatever follows `VITE_COUPON_`, case-insensitive.

## Expected backend contract

```
POST /api/checkout
Content-Type: application/json

{
  "items": [{ "id": "wireless-mouse", "name": "Wireless Mouse", "price": 999, "qty": 1 }],
  "couponCode": "SAVE20",
  "address": { "fullName": "...", "phone": "...", "line1": "...", "city": "...", "state": "...", "pincode": "..." },
  "orderId": "CC-XXXXX-XXXX"
}

→ 200 OK
{ "url": "https://checkout.stripe.com/c/pay/cs_test_..." }
```

The backend should treat `price`/`qty` from the client as untrusted, re-derive the amount
from its own product list, re-validate the coupon against its own copy of the `.env`
coupon table, and set `success_url` / `cancel_url` to this frontend's `/success` and
`/cancel` routes (including `?order=<orderId>` on the success URL so `/success` can show
the recap).

## Demo mode (no backend required)

`src/api/checkout.js` first tries the real `/api/checkout` call — exactly once. If that
request fails to reach a server at all (network error — i.e. no backend is running), it
falls back to a clearly-labeled **DEMO MODE** that simulates a session and routes straight
to `/success`, so the full cart → address → coupon → checkout flow can be reviewed
standalone. Once a real backend is running, this path is never taken.

## Project structure

```
src/
  api/checkout.js            POST /api/checkout (single call) + demo fallback
  components/                 ProductCard, ProductList, Cart, CouponForm, AddressForm,
                               CancelOrderModal, TraceDivider, Icons
  context/
    CartContext.jsx           cart + coupon + address state (reducer)
    OrdersContext.jsx         order history + cancellation, persisted to localStorage
    WishlistContext.jsx       wishlist, persisted to localStorage
  data/
    products.js                product catalog (id, price, real image, rating)
    coupons.js                  reads VITE_COUPON_* from .env
  pages/                       Home, Checkout, Success, Cancel, Orders, Wishlist
  utils/format.js             ₹ currency formatting
.env.example                  coupon + store config template (copy to .env)
```
