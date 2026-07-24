import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist()

  return (
    <div className="page">
      <div className="hero hero-compact">
        <p className="hero-eyebrow">Saved for later</p>
        <h1>Your wishlist</h1>
      </div>

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
        </div>
      )}
    </div>
  )
}