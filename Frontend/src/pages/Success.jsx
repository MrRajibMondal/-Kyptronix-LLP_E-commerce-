import { Link, useSearchParams } from 'react-router-dom'
import { CheckGlyphIcon } from '../components/Icons.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR } from '../utils/format.js'

export default function Success() {
  const { getOrder } = useOrders()
  const [params] = useSearchParams()
  const orderId = params.get('order')
  const order = orderId ? getOrder(orderId) : null

  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon success">
          <CheckGlyphIcon />
        </div>
        <h1>Order Placed Successfully 🎉</h1>
        <p>
          Thanks for your order! Your items will be packed shortly, and you can pay in cash
          when they&rsquo;re delivered.
        </p>

        {order && (
          <div className="order-recap">
            <div className="order-recap-row">
              <span>Order ID</span>
              <strong>{order.id}</strong>
            </div>
            {order.address && (
              <div className="order-recap-row">
                <span>Delivering to</span>
                <strong>{order.address.city}, {order.address.state} — {order.address.pincode}</strong>
              </div>
            )}
            <div className="order-recap-row">
              <span>Payment method</span>
              <strong>{order.paymentMethod || 'Cash on Delivery'}</strong>
            </div>
            <div className="order-recap-row">
              <span>Amount payable</span>
              <strong>{formatINR(order.total)}</strong>
            </div>
          </div>
        )}

        <div className="result-actions">
          <Link to="/" className="btn btn-primary">Back to shop</Link>
          <Link to="/orders" className="btn btn-ghost">View orders</Link>
        </div>
      </div>
    </div>
  )
}
