import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/format.js'
import { CartGlyphIcon } from '../components/Icons.jsx'

export default function CartPage() {
  const { items, subtotal, itemCount, dispatch } = useCart()
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="hero hero-compact">
        <p className="hero-eyebrow">Step 1 of 3</p>
        <h1>Your cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <CartGlyphIcon style={{ width: 40, height: 40, color: 'var(--line)' }} />
          <p>Your cart is empty. Add a product to get started.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      ) : (
        <div className="cart-page-grid">
          <section className="cart-page-list">
            <div className="cart-page-list-header">
              <span>{itemCount} item{itemCount === 1 ? '' : 's'} in your cart</span>
              <button
                className="cart-remove-all"
                onClick={() => dispatch({ type: 'CLEAR_ITEMS' })}
              >
                Remove all
              </button>
            </div>

            {items.map((item) => (
              <div className="cart-line" key={item.id}>
                <div className="cart-line-media">
                  {item.image && <img src={item.image} alt={item.name} />}
                </div>
                <div className="cart-line-info">
                  <Link to={`/product/${item.id}`} className="cart-line-name">{item.name}</Link>
                  <div className="cart-line-price">{formatINR(item.price)} each</div>
                  <div className="cart-line-controls">
                    <div className="qty-stepper">
                      <button
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-line-total">{formatINR(item.price * item.qty)}</div>
              </div>
            ))}
          </section>

          <aside className="cart-panel" aria-label="Price summary">
            <div className="cart-panel-header">
              <h2>Price details</h2>
            </div>
            <div className="totals">
              <div className="totals-row">
                <span>Price ({itemCount} item{itemCount === 1 ? '' : 's'})</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="totals-row grand">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
              Proceed to checkout · {formatINR(subtotal)}
            </button>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
              Next: delivery address, coupon, and GST breakup.
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
