import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { getProduct } from '../data/products.js'
import { formatINR } from '../utils/format.js'
import CancelOrderModal from '../components/CancelOrderModal.jsx'

function productImage(item) {
  return item.image || getProduct(item.id)?.images?.[0]
}

export default function Orders() {
  const { orders, cancelOrder } = useOrders()
  const { toggle: toggleWishlist, has: inWishlist } = useWishlist()
  const [cancelTarget, setCancelTarget] = useState(null)

  function handleConfirmCancel({ reason, note, moveToWishlist }) {
    cancelOrder(cancelTarget.id, { reason, note, moveToWishlist })
    if (moveToWishlist) {
      cancelTarget.items.forEach((item) => {
        if (!inWishlist(item.id)) toggleWishlist(item.id)
      })
    }
    setCancelTarget(null)
  }

  return (
    <div className="page">
      <div className="hero hero-compact">
        <p className="hero-eyebrow">Order history</p>
        <h1>Your orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders yet. Once you check out, they&rsquo;ll show up here.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className={`order-card${order.status === 'cancelled' ? ' cancelled' : ''}`} key={order.id}>
              <div className="order-card-header">
                <div>
                  <div className="order-id">{order.id}</div>
                  <div className="order-date">
                    {new Date(order.placedAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </div>
                </div>
                <span className={`order-status ${order.status}`}>
                  {order.status === 'cancelled' ? 'Cancelled' : 'Placed'}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.id}>
                    {productImage(item) && <img src={productImage(item)} alt={item.name} />}
                    <div>
                      <div className="order-item-name">{item.name}</div>
                      <div className="order-item-qty">Qty {item.qty} · {formatINR(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {order.address && (
                <div className="order-address">
                  Delivering to <strong>{order.address.fullName}</strong> — {order.address.line1},{' '}
                  {order.address.city}, {order.address.state} {order.address.pincode}
                </div>
              )}

              <div className="order-card-footer">
                <div className="order-total">
                  Total: <strong>{formatINR(order.total)}</strong>
                  <div style={{ fontSize: '0.75rem', marginTop: 2 }}>{order.paymentMethod || 'Cash on Delivery'}</div>
                </div>
                {order.status === 'placed' ? (
                  <button className="btn btn-ghost btn-sm" onClick={() => setCancelTarget(order)}>
                    Cancel order
                  </button>
                ) : (
                  <div className="order-cancel-meta">
                    Cancelled — {order.cancelReason}
                    {order.movedToWishlist && ' · moved to wishlist'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelOrderModal
          order={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  )
}
