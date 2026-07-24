import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
import ProductCard from '../components/ProductCard.jsx'

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist()
<<<<<<< HEAD
=======
=======
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS } from '../data/products.js'
import { formatINR, discountPercent } from '../utils/format.js'
import { HeartIcon } from '../components/Icons.jsx'

export default function Wishlist() {
  const { ids, remove } = useWishlist()
  const { dispatch } = useCart()
  const items = PRODUCTS.filter((p) => ids.includes(p.id))
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

  return (
    <div className="page">
      <div className="hero hero-compact">
        <p className="hero-eyebrow">Saved for later</p>
        <h1>Your wishlist</h1>
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      {loading ? (
        <p className="section-label">Loading your wishlist…</p>
      ) : wishlist.length === 0 ? (
        <div className="empty-state">
          <p>Nothing saved yet. Tap the heart on any product to keep it here.</p>
          <Link to="/" className="btn btn-primary btn-sm">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
<<<<<<< HEAD
=======
=======
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
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        </div>
      )}
    </div>
  )
<<<<<<< HEAD
}
=======
<<<<<<< HEAD
}
=======
}
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
