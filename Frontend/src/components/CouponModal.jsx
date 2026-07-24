import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { COUPONS } from '../data/coupons.js'
import { CloseIcon, TagIcon } from './Icons.jsx'

export default function CouponModal({ onClose }) {
  const { coupon, couponError, dispatch, items } = useCart()
  const [code, setCode] = useState('')
  const availableCodes = Object.keys(COUPONS)

  function applyCode(rawCode) {
    if (!rawCode.trim()) return
    dispatch({ type: 'APPLY_COUPON', code: rawCode })
    setCode('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    applyCode(code)
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Apply coupon">
      <div className="modal-card coupon-modal">
        <div className="coupon-modal-header">
          <h3><TagIcon /> Apply coupon</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {coupon ? (
          <div className="coupon-applied">
            <span>
              Coupon <strong>{coupon.code}</strong> applied — {coupon.percentOff}% off
            </span>
            <button onClick={() => dispatch({ type: 'REMOVE_COUPON' })}>Remove</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="coupon-row">
              <input
                className="coupon-input"
                placeholder="COUPON CODE"
                value={code}
                disabled={items.length === 0}
                onChange={(e) => setCode(e.target.value)}
                aria-label="Coupon code"
                autoFocus
              />
              <button type="submit" className="btn btn-primary" disabled={items.length === 0}>
                Apply
              </button>
            </div>
            {couponError && <p className="coupon-msg error">{couponError}</p>}
          </form>
        )}

        {availableCodes.length > 0 && (
          <div className="coupon-list">
            <p className="coupon-list-label">Available offers</p>
            {availableCodes.map((c) => (
              <button
                key={c}
                type="button"
                className="coupon-list-item"
                disabled={!!coupon}
                onClick={() => applyCode(c)}
              >
                <span className="coupon-list-code">{c}</span>
                <span className="coupon-list-desc">{COUPONS[c].percentOff}% off on your order</span>
              </button>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}
