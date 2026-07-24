import React, { createContext, useContext, useEffect, useState } from 'react'
import API from '../services/api'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'circuit-co.wishlist'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Same normalization CartContext relies on: prefer the slug `.id`
// (what the backend actually looks products up by), fall back to `_id`.
function normalizeProduct(p) {
  if (!p) return p
  return { ...p, id: p.id || p._id }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadInitial)
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch Wishlist from Backend on Mount
  const fetchWishlist = async () => {
    try {
      setLoading(true)
      const res = await API.get('/wishlist')
      const rawProducts = res.data?.products || []
      const productsData = rawProducts.map(normalizeProduct)
      const fetchedIds = res.data?.ids || productsData.map((p) => p.id).filter(Boolean)

      setWishlist(productsData)
      setIds(fetchedIds)
    } catch (err) {
      console.error('Error fetching wishlist from backend:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  // 2. Persist IDs to localStorage for instant UI response
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Storage unavailable (private browsing, quota, etc.) — fail silently
    }
  }, [ids])

  // Helper function to extract normalized ID string
  const normalizeId = (productId) => {
    if (!productId) return ''
    if (typeof productId === 'object') {
      return productId.id || productId._id || ''
    }
    return String(productId)
  }

  // 3. Toggle Wishlist Item (Optimistic update + Backend Sync)
  const toggle = async (productId) => {
    const idStr = normalizeId(productId)
    if (!idStr) return

    setIds((prev) =>
      prev.includes(idStr) ? prev.filter((id) => id !== idStr) : [...prev, idStr]
    )

    try {
      const res = await API.post('/wishlist/toggle', { productId: idStr })
      if (Array.isArray(res.data?.ids)) {
        setIds(res.data.ids)
      }
      fetchWishlist()
    } catch (err) {
      console.error('Error toggling wishlist item on backend:', err)
    }
  }

  const toggleWishlist = toggle

  // 4. Remove Item from Wishlist
  const remove = async (productId) => {
    const idStr = normalizeId(productId)
    if (!idStr) return

    setIds((prev) => prev.filter((id) => id !== idStr))
    setWishlist((prev) => prev.filter((p) => p.id !== idStr))

    try {
      await API.delete(`/wishlist/${idStr}`)
    } catch (err) {
      console.error('Error removing item from wishlist:', err)
    }
  }

  // 5. Check if Product is in Wishlist
  const has = (productId) => {
    const idStr = normalizeId(productId)
    return ids.includes(idStr)
  }

  const value = {
    ids,
    wishlist,
    loading,
    toggle,
    toggleWishlist,
    remove,
    has,
    fetchWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return ctx
}