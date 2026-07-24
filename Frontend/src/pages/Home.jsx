import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import API from '../services/api'
import HeroSwiper from '../components/HeroSwiper.jsx'
import ProductList from '../components/ProductList.jsx'
import { PRODUCTS, CATEGORIES } from '../data/products.js'

export default function Home() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const query = (params.get('q') || '').trim().toLowerCase()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [useLocalFallback, setUseLocalFallback] = useState(false)

  // 1. Fetch Products from Backend API with Local Fallback
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Pass query params to API for efficient server-side filtering
        const res = await API.get('/products', {
          params: {
            category: category || undefined,
<<<<<<< HEAD
            search: query || undefined,
=======
<<<<<<< HEAD
            search: query || undefined,
=======
            q: query || undefined,
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
          },
        })

        if (Array.isArray(res.data)) {
          setProducts(res.data)
          setUseLocalFallback(false)
        } else if (res.data?.products && Array.isArray(res.data.products)) {
          setProducts(res.data.products)
          setUseLocalFallback(false)
        } else {
          setUseLocalFallback(true)
        }
      } catch (err) {
        console.error('API connection failed, falling back to local static data:', err)
        setUseLocalFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, query])

  // 2. Fallback Filter Logic (Client-side) if API is unavailable
  const localFiltered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = !category || p.category === category
      const matchesQuery =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.tagline?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const displayedProducts = useLocalFallback ? localFiltered : products

  function clearFilters() {
    setParams({})
  }

  const title = query
    ? `01 · Results for "${params.get('q')}"`
    : category
    ? `01 · ${category}`
    : '01 · Products'

  return (
    <div className="page">
      <HeroSwiper />

      {/* Category Chips Navigation */}
      <div className="category-chip-row">
        <button
          className={`category-chip${!category ? ' active' : ''}`}
          onClick={clearFilters}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`category-chip${category === c ? ' active' : ''}`}
            onClick={() =>
              setParams(
                query ? { category: c, q: params.get('q') } : { category: c }
              )
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Loading & Product Display */}
      {loading ? (
        <div className="empty-state">
          <p>Loading products...</p>
        </div>
      ) : (
        <ProductList products={displayedProducts} title={title} />
      )}
    </div>
  )
}