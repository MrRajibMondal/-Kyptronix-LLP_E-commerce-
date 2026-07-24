import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR, gstBreakup, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../utils/format.js'
import AddressForm from '../components/AddressForm.jsx'
import CouponModal from '../components/CouponModal.jsx'
import TraceDivider from '../components/TraceDivider.jsx'
import { TruckIcon, TagIcon, CashIcon } from '../components/Icons.jsx'

export default function Checkout() {
  const { items, coupon, subtotal, discount, address, dispatch } = useCart()
  const { placeOrder } = useOrders()
  const [stage, setStage] = useState(address ? 'summary' : 'address')
  const [showCoupon, setShowCoupon] = useState(false)
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Your cart is empty, so there&rsquo;s nothing to check out yet.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      </div>
    )
  }

  const taxable = subtotal - discount
  const gst = gstBreakup(taxable)
  const deliveryFee = taxable >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const grandTotal = taxable + gst.total + deliveryFee

  function handleAddressSubmit(form) {
    dispatch({ type: 'SET_ADDRESS', address: form })
    setStage('summary')
  }

  async function handlePlaceOrder() {
    setPlacing(true)
    try {
      const orderId = await placeOrder({
        items,
        address,
        subtotal,
        discount,
        total: grandTotal,
        coupon,
        gst: gst.total,
        deliveryFee,
        paymentMethod: 'Cash on Delivery'
      })
      dispatch({ type: 'CLEAR_CART' })
      navigate(`/success?order=${encodeURIComponent(orderId)}`)
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="page">
      <div className="checkout-steps">
        <span className={`step${stage === 'address' ? ' active' : ' done'}`}>1 · Delivery address</span>
        <span className="step-sep" />
        <span className={`step${stage === 'summary' ? ' active' : stage === 'payment' ? ' done' : ''}`}>2 · Coupon &amp; GST</span>
        <span className="step-sep" />
        <span className={`step${stage === 'payment' ? ' active' : ''}`}>3 · Payment</span>
      </div>

      <div className="checkout-grid">
        <section>
          {stage === 'address' && (
            <>
              <p className="section-label">01 · Where should we deliver this?</p>
              <div className="address-card">
                <div className="address-card-header">
                  <TruckIcon />
                  <div>
                    <strong>Delivery address</strong>
                    <p>We&rsquo;ll use this to estimate delivery and print your shipping label.</p>
                  </div>
                </div>
                <AddressForm
                  initial={address}
                  onSubmit={handleAddressSubmit}
                  submitLabel="Save address & continue"
                />
              </div>
            </>
          )}

          {stage === 'summary' && (
            <>
              <p className="section-label">02 · Coupon &amp; order summary</p>
              <div className="address-card">
                <div className="address-card-header">
                  <TruckIcon />
                  <div>
                    <strong>Delivering to {address.fullName}</strong>
                    <p>{address.line1}, {address.city}, {address.state} {address.pincode}</p>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setStage('address')}>
                  Change address
                </button>
              </div>

              <div className="address-card" style={{ marginTop: 16 }}>
                <div className="address-card-header">
                  <TagIcon style={{ width: 30, height: 30, color: 'var(--indigo)' }} />
                  <div>
                    <strong>{coupon ? `${coupon.code} applied` : 'Have a coupon?'}</strong>
                    <p>{coupon ? `${coupon.percentOff}% discount added to your order.` : 'Apply a coupon code to save on this order.'}</p>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowCoupon(true)}>
                  {coupon ? 'Manage coupon' : 'Apply coupon'}
                </button>
              </div>

              <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={() => setStage('payment')}>
                Continue to payment
              </button>
            </>
          )}

          {stage === 'payment' && (
            <>
              <p className="section-label">03 · Payment method</p>
              <div className="address-card">
                <div className="address-card-header">
                  <CashIcon style={{ width: 30, height: 30, color: 'var(--indigo)' }} />
                  <div>
                    <strong>Choose how you&rsquo;d like to pay</strong>
                    <p>Pay the delivery agent when your order arrives.</p>
                  </div>
                </div>

                <div className="payment-method-list">
                  <label className="payment-method-option selected">
                    <input type="radio" name="payment" checked readOnly />
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay in cash when your order is delivered.</p>
                    </div>
                  </label>
                  <label className="payment-method-option disabled">
                    <input type="radio" name="payment" disabled />
                    <div>
                      <strong>Credit / Debit card</strong>
                      <p>Coming soon.</p>
                    </div>
                  </label>
                  <label className="payment-method-option disabled">
                    <input type="radio" name="payment" disabled />
                    <div>
                      <strong>UPI</strong>
                      <p>Coming soon.</p>
                    </div>
                  </label>
                </div>

                <button className="btn btn-primary btn-block" disabled={placing} onClick={handlePlaceOrder}>
                  {placing ? 'Placing order…' : `Place order · ${formatINR(grandTotal)}`}
                </button>
              </div>
            </>
          )}
        </section>

        <aside className="cart-panel" aria-label="Order summary">
          <div className="cart-panel-header">
            <h2>Order summary</h2>
          </div>
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    {formatINR(item.price)} × {item.qty} = {formatINR(item.price * item.qty)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <TraceDivider label="total" />
          <div className="totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            {coupon && (
              <div className="totals-row discount">
                <span>Discount ({coupon.percentOff}% · {coupon.code})</span>
                <span>−{formatINR(discount)}</span>
              </div>
            )}
            <div className="totals-row">
              <span>CGST (9%)</span>
              <span>{formatINR(gst.cgst)}</span>
            </div>
            <div className="totals-row">
              <span>SGST (9%)</span>
              <span>{formatINR(gst.sgst)}</span>
            </div>
            <div className="totals-row">
              <span>Delivery fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}</span>
            </div>
            <div className="totals-row grand">
              <span>Total</span>
              <span>{formatINR(grandTotal)}</span>
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
            Pay with cash when your order is delivered.
          </p>
        </aside>
      </div>

      {showCoupon && <CouponModal onClose={() => setShowCoupon(false)} />}
    </div>
  )
}
