import { useState } from 'react'
import { CANCEL_REASONS } from '../context/OrdersContext.jsx'

export default function CancelOrderModal({ order, onClose, onConfirm }) {
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [moveToWishlist, setMoveToWishlist] = useState(true)

  function handleConfirm() {
    if (!reason) return
    onConfirm({ reason, note, moveToWishlist })
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Cancel order">
      <div className="modal-card">
        <h3>Cancel order {order.id}?</h3>
        <p className="modal-sub">Tell us why — it helps us fix things for next time.</p>

        <div className="reason-list">
          {CANCEL_REASONS.map((r) => (
            <label key={r} className={`reason-option${reason === r ? ' selected' : ''}`}>
              <input
                type="radio"
                name="cancel-reason"
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
              />
              {r}
            </label>
          ))}
        </div>

        {reason === 'Other' && (
          <textarea
            className="reason-note"
            placeholder="Tell us a bit more…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        )}

        <label className="wishlist-move-check">
          <input
            type="checkbox"
            checked={moveToWishlist}
            onChange={(e) => setMoveToWishlist(e.target.checked)}
          />
          Move these items to my wishlist instead of losing them entirely
        </label>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Keep order</button>
          <button className="btn btn-danger" disabled={!reason} onClick={handleConfirm}>
            Confirm cancellation
          </button>
        </div>
      </div>
    </div>
  )
}
