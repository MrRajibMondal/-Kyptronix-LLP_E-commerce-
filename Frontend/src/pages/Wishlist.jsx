import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS } from '../data/products.js'
import { formatINR, discountPercent } from '../utils/format.js'
import { HeartIcon } from '../components/Icons.jsx'

export default function Wishlist() {
  const { ids, remove } = useWishlist()
  const { dispatch } = useCart()
  const items = PRODUCTS.filter((p) => ids.includes(p.id))

  return (
    <div className="page">
      <div className="hero hero-compact">
        <p className="hero-eyebrow">Saved for later</p>
        <h1>Your wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>Nothing saved yet. Tap the heart on a product to keep it here.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((product) => {
            const off = discountPercent(product.price, product.mrp)
            return (
              <div className="product-card" key={product.id}>
                <Link to={`/product/${product.id}`} className="product-media-link">
                  <div className="product-media">
                    <img src={product.images[0]} alt={product.name} loading="lazy" />
                    {off > 0 && <span className="product-discount-badge">{off}% off</span>}
                  </div>
                </Link>
                <button
                  className="wishlist-toggle active"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <HeartIcon filled />
                </button>
                <Link to={`/product/${product.id}`} className="product-name-link">
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-tagline">{product.tagline}</p>
                <div className="product-footer">
                  <div>
                    <span className="price">{formatINR(product.price)}</span>
                    {off > 0 && <span className="price-strike">{formatINR(product.mrp)}</span>}
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => dispatch({ type: 'ADD_ITEM', product })}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
