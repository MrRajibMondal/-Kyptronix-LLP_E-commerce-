import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'
import { getProduct, relatedProducts } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { formatINR, discountPercent } from '../utils/format.js'
import { HeartIcon } from '../components/Icons.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)

  const { dispatch, items, addToCart } = useCart()
  const { has, toggle } = useWishlist()

  // 1. Fetch Product Data from API with Fallback to local data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await API.get(`/products/${id}`)
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        const fetched = res.data?.product || res.data
        if (fetched && (fetched.id || fetched._id)) {
          setProduct(fetched)
        } else {
          throw new Error('Unexpected response shape')
<<<<<<< HEAD
=======
=======
        if (res.data) {
          setProduct(res.data)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        }
      } catch (err) {
        console.error('Error fetching product from API, checking local data:', err)
        const localProduct = getProduct(id)
        if (localProduct) {
          setProduct(localProduct)
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>We couldn&rsquo;t find that product.</p>
          <Link to="/" className="btn btn-primary">Back to shop</Link>
        </div>
      </div>
    )
  }

  // Handle normalization for ID and Images between local mock vs backend Mongo shapes
  const productId = product._id || product.id
  const imagesList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || 'https://via.placeholder.com/600x600?text=No+Image']

  const inCart = Array.isArray(items) ? items.find((i) => i.id === productId || i._id === productId) : null
  const wished = has ? has(productId) : false
  const off = product.mrp ? discountPercent(product.price, product.mrp) : 0
  
  // Safely grab related products
  const related = typeof relatedProducts === 'function' ? relatedProducts(productId) : []

  function handleAddToCart() {
    if (dispatch) {
      dispatch({ type: 'ADD_ITEM', product, qty })
    } else if (addToCart) {
      addToCart(productId, qty)
    }
  }

  function handleBuyNow() {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <div className="page">
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link to={`/?category=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
          </>
        )}
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="product-detail-grid">
        {/* Gallery */}
        <div className="product-gallery">
          {imagesList.length > 1 && (
            <div className="product-gallery-thumbs">
              {imagesList.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  className={`product-gallery-thumb${i === activeImage ? ' active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1} of ${product.name}`}
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          <div className="product-gallery-main">
            <img src={imagesList[activeImage] || imagesList[0]} alt={product.name} />
            <button
              className={`wishlist-toggle${wished ? ' active' : ''}`}
              onClick={() => toggle && toggle(productId)}
              aria-pressed={wished}
              aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            >
              <HeartIcon filled={wished} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="product-detail-info">
          {product.category && <p className="product-detail-category">{product.category}</p>}
          <h1>{product.name}</h1>

          {product.rating !== undefined && (
            <div className="product-rating">
              <span className="stars" aria-hidden="true">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="rating-count">
                {product.rating} {product.reviews ? `(${product.reviews.toLocaleString('en-IN')} ratings)` : ''}
              </span>
            </div>
          )}

          <div className="product-detail-price">
            <span className="price price-lg">{formatINR ? formatINR(product.price) : `$${product.price}`}</span>
            {off > 0 && product.mrp && (
              <>
                <span className="price-strike">{formatINR ? formatINR(product.mrp) : `$${product.mrp}`}</span>
                <span className="hero-slide-off">{off}% off</span>
              </>
            )}
          </div>
          <p className="product-detail-gst">Inclusive of all taxes</p>

          {product.tagline && <p className="product-tagline product-detail-tagline">{product.tagline}</p>}
          <p className="product-detail-description">{product.description}</p>

          {/* Specifications Table */}
          {Array.isArray(product.specs) && product.specs.length > 0 && (
            <table className="spec-table">
              <tbody>
                {product.specs.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Actions */}
          <div className="product-detail-actions">
            <div className="qty-stepper qty-stepper-detail">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-ghost btn-block" onClick={handleAddToCart}>
              {inCart ? `In cart · ${inCart.qty || qty}` : 'Add to cart'}
            </button>
            <button className="btn btn-primary btn-block" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="related-section">
          <p className="section-label">You may also like</p>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}