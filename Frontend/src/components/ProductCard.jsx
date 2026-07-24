import { Link } from 'react-router-dom'
import { HeartIcon } from './Icons.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { formatINR, discountPercent } from '../utils/format.js'

export default function ProductCard({ product }) {
  const { dispatch, items } = useCart()
  const { has, toggle } = useWishlist()

  // Some product objects (e.g. from the wishlist API) only have `_id`,
  // not the `.id` slug — fall back so cart/wishlist lookups still match.
  const pid = product.id || product._id

  const inCart = items.find((i) => i.id === pid)
  const wished = has(pid)
  const off = discountPercent(product.price, product.mrp)
  const image = product.images ? product.images[0] : product.image

  return (
    <div className="product-card">
      <Link to={`/product/${pid}`} className="product-media-link">
        <div className="product-media">
          <img src={image} alt={product.name} loading="lazy" />
          {off > 0 && <span className="product-discount-badge">{off}% off</span>}
        </div>
      </Link>
      <button
        className={`wishlist-toggle${wished ? ' active' : ''}`}
        onClick={() => toggle(pid)}
        aria-pressed={wished}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      >
        <HeartIcon filled={wished} />
      </button>

      <div className="product-rating">
        <span className="stars" aria-hidden="true">
          {'★'.repeat(Math.round(product.rating))}
          {'☆'.repeat(5 - Math.round(product.rating))}
        </span>
        <span className="rating-count">{product.rating} ({product.reviews.toLocaleString('en-IN')})</span>
      </div>

      <Link to={`/product/${pid}`} className="product-name-link">
        <h3 className="product-name">{product.name}</h3>
      </Link>
      <p className="product-tagline">{product.tagline}</p>

      <div className="product-footer">
        <div>
          <span className="price">{formatINR(product.price)}</span>
          {off > 0 && <span className="price-strike">{formatINR(product.mrp)}</span>}
        </div>

        {inCart ? (
          <div className="qty-stepper qty-stepper-card">
            <button
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => dispatch({ type: 'DECREMENT', id: pid })}
            >
              −
            </button>
            <span>{inCart.qty}</span>
            <button
              aria-label={`Increase quantity of ${product.name}`}
              onClick={() => dispatch({ type: 'INCREMENT', id: pid })}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => dispatch({ type: 'ADD_ITEM', product })}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  )
}