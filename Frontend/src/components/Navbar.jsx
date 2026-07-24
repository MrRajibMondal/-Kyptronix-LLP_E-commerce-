import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
<<<<<<< HEAD
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import { formatINR } from '../utils/format.js'
import API from '../services/api.js'
import { ChevronDownIcon, HeartIcon, CartGlyphIcon, SearchIcon, PackageIcon } from './Icons.jsx'
=======
<<<<<<< HEAD
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import { formatINR } from '../utils/format.js'
import API from '../services/api.js'
=======
import { CATEGORIES } from '../data/products.js'
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
import { ChevronDownIcon, HeartIcon, CartGlyphIcon, SearchIcon } from './Icons.jsx'
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const catRef = useRef(null)
  const searchRef = useRef(null)
<<<<<<< HEAD
=======
=======
  const catRef = useRef(null)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const navigate = useNavigate()

  useEffect(() => {
    function onClickOutside(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false)
<<<<<<< HEAD
      if (searchRef.current && !searchRef.current.contains(e.target)) setDropdownOpen(false)
=======
<<<<<<< HEAD
      if (searchRef.current && !searchRef.current.contains(e.target)) setDropdownOpen(false)
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  // Live search: debounce keystrokes, hit the backend product search endpoint,
  // and fall back to the local product catalog if the API isn't reachable.
  useEffect(() => {
    const term = query.trim()
    if (!term) {
      setResults([])
      setSearching(false)
      return
    }

    let cancelled = false
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const res = await API.get('/products', { params: { search: term, limit: 6 } })
        const products = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.products)
          ? res.data.products
          : null

        if (!cancelled) {
          if (products) {
            setResults(products.slice(0, 6))
          } else {
            throw new Error('Unexpected response shape')
          }
        }
      } catch (err) {
        if (!cancelled) {
          const lower = term.toLowerCase()
          const local = PRODUCTS.filter(
            (p) =>
              p.name?.toLowerCase().includes(lower) ||
              p.tagline?.toLowerCase().includes(lower) ||
              p.category?.toLowerCase().includes(lower)
          ).slice(0, 6)
          setResults(local)
        }
      } finally {
        if (!cancelled) setSearching(false)
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

<<<<<<< HEAD
=======
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  function goToCategory(category) {
    setCatOpen(false)
    navigate(category ? `/?category=${encodeURIComponent(category)}` : '/')
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  function goToProduct(id) {
    setDropdownOpen(false)
    setQuery('')
    navigate(`/product/${id}`)
  }

  function handleSearch(e) {
    e.preventDefault()
    setDropdownOpen(false)
<<<<<<< HEAD
=======
=======
  function handleSearch(e) {
    e.preventDefault()
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
        <div className="navbar-search-wrap" ref={searchRef}>
          <form className="navbar-search" onSubmit={handleSearch} role="search">
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setDropdownOpen(true)
              }}
              onFocus={() => query.trim() && setDropdownOpen(true)}
              onKeyDown={(e) => e.key === 'Escape' && setDropdownOpen(false)}
              placeholder="Search for products…"
              aria-label="Search products"
              autoComplete="off"
            />
          </form>

          {dropdownOpen && query.trim() && (
            <div className="search-dropdown" role="listbox">
              {searching ? (
                <p className="search-dropdown-status">Searching…</p>
              ) : results.length === 0 ? (
                <p className="search-dropdown-status">No products match “{query.trim()}”.</p>
              ) : (
                <>
                  {results.map((product) => {
                    const image = product.images ? product.images[0] : product.image
                    return (
                      <button
                        type="button"
                        key={product.id}
                        className="search-dropdown-item"
                        onClick={() => goToProduct(product.id)}
                        role="option"
                      >
                        <img src={image} alt="" loading="lazy" />
                        <span className="search-dropdown-item-info">
                          <span className="search-dropdown-item-name">{product.name}</span>
                          <span className="search-dropdown-item-category">{product.category}</span>
                        </span>
                        <span className="search-dropdown-item-price">{formatINR(product.price)}</span>
                      </button>
                    )
                  })}
                  <button type="button" className="search-dropdown-viewall" onClick={handleSearch}>
                    View all results for “{query.trim()}”
                  </button>
                </>
              )}
            </div>
          )}
        </div>
<<<<<<< HEAD

        <div className="navbar-actions">
          <NavLink to="/orders" className="navbar-icon-link" aria-label="My orders">
            <PackageIcon />
            <span>My Orders</span>
          </NavLink>
=======
=======
        <form className="navbar-search" onSubmit={handleSearch} role="search">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products…"
            aria-label="Search products"
          />
        </form>
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58

        <div className="navbar-actions">
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
