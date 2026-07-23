import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { CATEGORIES } from '../data/products.js'
import { ChevronDownIcon, HeartIcon, CartGlyphIcon, SearchIcon } from './Icons.jsx'

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="20" height="20" rx="5" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="17" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1.4" fill="currentColor" stroke="none" />
      <path d="M9 9h8M9 17h8M9 9v8M17 9v8" opacity="0.35" />
    </svg>
  )
}

export default function Navbar() {
  const { itemCount } = useCart()
  const { ids } = useWishlist()
  const [catOpen, setCatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const catRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function goToCategory(category) {
    setCatOpen(false)
    navigate(category ? `/?category=${encodeURIComponent(category)}` : '/')
  }

  function handleSearch(e) {
    e.preventDefault()
    navigate(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/')
  }

  return (
    <header className="navbar">
      <div className="navbar-row">
        <Link to="/" className="brand" aria-label="Circuit & Co. home">
          <BrandMark />
          Circuit &amp; Co.
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end className="navbar-link">
            Home
          </NavLink>

          <div className="navbar-dropdown" ref={catRef}>
            <button
              type="button"
              className={`navbar-link navbar-dropdown-btn${catOpen ? ' open' : ''}`}
              onClick={() => setCatOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={catOpen}
            >
              Category <ChevronDownIcon className="chev" />
            </button>
            {catOpen && (
              <div className="navbar-dropdown-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => goToCategory(null)}>
                  All products
                </button>
                {CATEGORIES.map((c) => (
                  <button type="button" role="menuitem" key={c} onClick={() => goToCategory(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <form className="navbar-search" onSubmit={handleSearch} role="search">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products…"
            aria-label="Search products"
          />
        </form>

        <div className="navbar-actions">
          <NavLink to="/wishlist" className="navbar-icon-link" aria-label="Wishlist">
            <HeartIcon />
            <span>Wishlist</span>
            {ids.length > 0 && <span className="navbar-badge">{ids.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="navbar-icon-link" aria-label="Cart">
            <CartGlyphIcon />
            <span>Cart</span>
            {itemCount > 0 && <span className="navbar-badge">{itemCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  )
}
