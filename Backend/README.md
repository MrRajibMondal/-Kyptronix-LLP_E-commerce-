# Circuit & Co. — Backend API

A Node.js + Express + MongoDB (Mongoose) backend built to match the
`ecommerce-checkout-frontend` React app: products, cart, coupons, checkout
(GST + delivery fee + Cash on Delivery), order history with cancellation,
and wishlist — plus a normal JWT-based auth layer so cart/orders/wishlist
persist per user instead of only in `localStorage`.

## Stack
- Express 4
- MongoDB via Mongoose
- JWT auth stored in an httpOnly cookie (also returned in the response body
  if you'd rather use `Authorization: Bearer <token>` from a mobile client)
- bcrypt password hashing
- helmet, cors, rate-limiting, morgan logging

## Getting started

```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI, JWT_SECRET, etc.
npm run seed               # loads the product catalog + a demo admin user
npm run dev                 # nodemon, http://localhost:5000
```

Requires a running MongoDB instance (local `mongod` or a connection string
from MongoDB Atlas) at whatever `MONGO_URI` you set in `.env`.

Demo admin created by the seed script: `admin@circuitco.test` /
`ChangeMe123!` — change this password before using it anywhere real.

## Project layout

```
backend/
  server.js                 # entry point, connects DB then starts Express
  src/
    app.js                  # express app: middleware + route mounting
    config/
      db.js                 # mongoose connection
      coupons.js             # env-driven coupon codes, same pattern as the frontend
    models/                 # User, Product, Cart, Order, Wishlist
    controllers/             # route handlers
    routes/                  # express routers
    middleware/               # auth (JWT) + centralized error handler
    utils/
      generateToken.js        # signs JWT, sets httpOnly cookie
      pricing.js              # GST split, delivery fee, cart total — mirrors
                                # the frontend's src/utils/format.js so totals
                                # always match what the client already renders
    seed/                    # product catalog seed + demo admin user
```

## Environment variables (`.env`)

| Variable | Purpose |
|---|---|
| `PORT` | API port (default 5000) |
| `NODE_ENV` | `development` / `production` |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | Auth token signing |
| `COOKIE_NAME` | Name of the httpOnly auth cookie |
| `GST_RATE`, `DELIVERY_FEE`, `FREE_DELIVERY_THRESHOLD` | Pricing rules, mirrors the frontend's `format.js` constants |
| `COUPON_<CODE>` | One env var per coupon, e.g. `COUPON_SAVE20=20` — same convention as the frontend's `VITE_COUPON_<CODE>` |

## API reference

All authenticated routes expect the JWT either in the `circuit_co_token`
httpOnly cookie (set automatically by `/api/auth/login` and `/register`) or
an `Authorization: Bearer <token>` header.

### Auth — `/api/auth`
| Method | Path | Access | Body |
|---|---|---|---|
| POST | `/register` | Public | `{ name, email, password, phone? }` |
| POST | `/login` | Public | `{ email, password }` |
| POST | `/logout` | Private | – |
| GET | `/me` | Private | – |
| PUT | `/me` | Private | `{ name?, phone?, addresses? }` |

### Products — `/api/products`
| Method | Path | Access | Notes |
|---|---|---|---|
| GET | `/` | Public | Query: `?category=`, `?search=`, `?page=`, `?limit=` |
| GET | `/categories` | Public | Distinct category list |
| GET | `/:id` | Public | `:id` is the slug, e.g. `wireless-mouse` |
| GET | `/:id/related` | Public | `?count=3` |
| POST | `/` | Admin | Create product |
| PUT | `/:id` | Admin | Update product |
| DELETE | `/:id` | Admin | Soft-delete (`isActive: false`) |

### Cart — `/api/cart` (all Private)
| Method | Path | Notes |
|---|---|---|
| GET | `/` | Returns items, coupon, address, and computed `subtotal/discount/gst/deliveryFee/total` |
| POST | `/items` | `{ productId, qty? }` — add or increase qty |
| DELETE | `/items/:productId` | Remove one item |
| PATCH | `/items/:productId/increment` | +1 qty |
| PATCH | `/items/:productId/decrement` | −1 qty, removes at 0 |
| POST | `/coupon` | `{ code }` — apply coupon (one per order) |
| DELETE | `/coupon` | Remove coupon |
| PUT | `/address` | Set delivery address for checkout |
| DELETE | `/items` | Clear all items + coupon (keeps cart doc) |
| POST | `/clear` | Full reset (items + coupon + address) |

### Coupons — `/api/coupons`
| Method | Path | Access |
|---|---|---|
| GET | `/:code` | Public — validity check only, doesn't apply it |

### Orders — `/api/orders` (all Private)
| Method | Path | Notes |
|---|---|---|
| POST | `/` | Places an order from the current cart (server recomputes pricing), then clears the cart. `{ address?, paymentMethod? }` |
| GET | `/` | Current user's orders, most recent first |
| GET | `/:orderId` | Single order by its `CC-XXXX` id |
| PATCH | `/:orderId/cancel` | `{ reason, note?, moveToWishlist? }` — `reason` must be one of the `CANCEL_REASONS` |
| GET | `/admin/all` | Admin — every order across all users |

### Wishlist — `/api/wishlist` (all Private)
| Method | Path | Notes |
|---|---|---|
| GET | `/` | Returns `{ ids, products }` |
| POST | `/toggle` | `{ productId }` |
| DELETE | `/:productId` | Remove one product |

## Notes on matching the frontend's behavior
- **Coupons**: one env var per code (`COUPON_SAVE20=20`), same as the
  frontend's `VITE_COUPON_SAVE20=20` — codes are case-insensitive, and only
  one coupon can be active on an order at a time.
- **Pricing**: GST is split evenly into CGST/SGST (`GST_RATE`, default 18%),
  and delivery is free above `FREE_DELIVERY_THRESHOLD` (default ₹500),
  otherwise `DELIVERY_FEE` (default ₹49) — same constants as
  `src/utils/format.js` in the frontend.
- **Cancel reasons** match the frontend's `CANCEL_REASONS` list exactly, and
  cancelling with `moveToWishlist: true` adds the order's items to the
  wishlist, just like `Orders.jsx` does client-side today.
- Only Cash on Delivery is implemented as a payment method, matching the
  current UI (card/UPI are shown there as "coming soon").
