import { Link } from 'react-router-dom'
import { CrossGlyphIcon } from '../components/Icons.jsx'

export default function Cancel() {
  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon cancel">
          <CrossGlyphIcon />
        </div>
        <h1>Payment Cancelled</h1>
        <p>
          No charge was made. Your cart is still saved, so you can pick up right where you left
          off whenever you're ready.
        </p>
        <div className="result-actions">
          <Link to="/checkout" className="btn btn-primary">
            Return to checkout
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}
