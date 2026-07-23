import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import API from '../services/api'

const CartContext = createContext(null)
const STORAGE_KEY = 'circuit-co.cart'

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadInitialCart)
  const [loading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState(null)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [address, setAddressState] = useState(() => {
    try {
      const saved = localStorage.getItem('checkout_address')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Helper to extract clean product string ID
  const getProductId = (product) => {
    if (!product) return ''
    if (typeof product === 'string') return product
    return product._id || product.id || ''
  }

  // 1. Fetch Cart from Backend on Load (Silently handles 401 for guests)
  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await API.get('/cart')
      const backendCart = res.data
      
      const rawItems = backendCart?.items || (Array.isArray(backendCart) ? backendCart : [])
      if (Array.isArray(rawItems) && rawItems.length > 0) {
        setCartItems(rawItems)
      }

      if (backendCart?.coupon) setCoupon(backendCart.coupon)
      if (backendCart?.discountAmount) setDiscountAmount(backendCart.discountAmount)
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error fetching backend cart:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // 2. Persist Cart Items to LocalStorage as Fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // Storage full or private mode — ignore error
    }
  }, [cartItems])

  // 3. Normalize Items Array for UI Components
  const items = useMemo(() => {
    if (!Array.isArray(cartItems)) return []
    return cartItems.map((item) => {
      const prod = item.product || item
      const pId = getProductId(prod)
      return {
        id: pId,
        productId: pId,
        name: prod.name || item.name || 'Product',
        price: prod.price || item.price || 0,
        image: prod.images?.[0] || prod.image || item.image || '',
        qty: item.quantity || item.qty || 1,
        product: prod,
      }
    })
  }, [cartItems])

  // 4. Add to Cart (Optimistic Local State Update + Backend Sync)
  const addItem = async (product, qty = 1) => {
    const pId = getProductId(product)
    const addQty = qty > 0 ? qty : 1
    if (!pId && typeof product !== 'object') return

    // Optimistic UI Update
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => getProductId(i.product || i) === pId)

      if (existingIndex > -1) {
        const updated = [...prev]
        const currentQty = updated[existingIndex].quantity || updated[existingIndex].qty || 1
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQty + addQty,
          qty: currentQty + addQty,
        }
        return updated
      } else {
        return [
          ...prev,
          {
            product: typeof product === 'object' ? product : { _id: pId },
            quantity: addQty,
            qty: addQty,
          },
        ]
      }
    })

    try {
      const res = await API.post('/cart', { productId: pId, quantity: addQty })
      if (res.data?.items) {
        setCartItems(res.data.items)
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error adding item to cart on backend:', err)
      }
    }
  }

  // Alias for backward compatibility
  const addToCart = addItem

  // 5. Remove Item from Cart
  const removeItem = async (productId) => {
    const pId = getProductId(productId)

    setCartItems((prev) => prev.filter((item) => getProductId(item.product || item) !== pId))

    try {
      const res = await API.delete(`/cart/${pId}`)
      if (res.data?.items) {
        setCartItems(res.data.items)
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error removing item from backend cart:', err)
      }
    }
  }

  // Alias
  const removeFromCart = removeItem

  // 6. Update Item Quantity
  const updateQuantity = async (productId, quantity) => {
    const pId = getProductId(productId)

    if (quantity <= 0) {
      return removeItem(pId)
    }

    setCartItems((prev) =>
      prev.map((item) => {
        const itemPId = getProductId(item.product || item)
        return itemPId === pId ? { ...item, quantity, qty: quantity } : item
      })
    )

    try {
      const res = await API.put(`/cart/${pId}`, { quantity })
      if (res.data?.items) {
        setCartItems(res.data.items)
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error updating cart item on backend:', err)
      }
    }
  }

  const incrementItem = (productId) => {
    const found = items.find((i) => i.id === productId)
    if (found) updateQuantity(productId, found.qty + 1)
  }

  const decrementItem = (productId) => {
    const found = items.find((i) => i.id === productId)
    if (found) {
      if (found.qty <= 1) removeItem(productId)
      else updateQuantity(productId, found.qty - 1)
    }
  }

  // 7. Apply & Remove Coupon
  const applyCoupon = async (code) => {
    try {
      setCouponError('')
      const res = await API.post('/cart/coupon', { code })
      if (res.data?.items) setCartItems(res.data.items)
      if (res.data?.coupon) setCoupon(res.data.coupon)
      if (res.data?.discountAmount) setDiscountAmount(res.data.discountAmount)
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired coupon code.'
      setCouponError(msg)
    }
  }

  const removeCoupon = async () => {
    try {
      setCouponError('')
      await API.delete('/cart/coupon')
    } catch {
      // Ignore fallback
    } finally {
      setCoupon(null)
      setDiscountAmount(0)
    }
  }

  // 8. Address Handler
  const setAddress = (newAddress) => {
    setAddressState(newAddress)
    if (newAddress) {
      localStorage.setItem('checkout_address', JSON.stringify(newAddress))
    } else {
      localStorage.removeItem('checkout_address')
    }
  }

  // 9. Clear Entire Cart
  const clearCart = async () => {
    setCartItems([])
    setCoupon(null)
    setDiscountAmount(0)
    setCouponError('')

    try {
      await API.delete('/cart')
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error clearing backend cart:', err)
      }
    }
  }

  // Price & Total Calculations
  const derived = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const discount = discountAmount
    const total = Math.max(0, subtotal - discount)
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

    return {
      subtotal,
      discount,
      total,
      itemCount,
      totalItems: itemCount,
      coupon,
    }
  }, [items, discountAmount, coupon])

  // Backward-compatible Reducer Dispatch Handler
  const dispatch = (action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return addItem(action.product, action.qty)
      case 'REMOVE_ITEM':
        return removeItem(action.id)
      case 'INCREMENT':
        return incrementItem(action.id)
      case 'DECREMENT':
        return decrementItem(action.id)
      case 'APPLY_COUPON':
        return applyCoupon(action.code)
      case 'REMOVE_COUPON':
        return removeCoupon()
      case 'SET_ADDRESS':
        return setAddress(action.address)
      case 'CLEAR_ITEMS':
      case 'CLEAR_CART':
        return clearCart()
      default:
        console.warn('Unknown action type:', action.type)
    }
  }

  const value = {
    cart: cartItems,
    items,
    loading,
    couponError,
    address,
    ...derived,
    dispatch,
    addItem,
    addToCart,
    removeItem,
    removeFromCart,
    updateQuantity,
    incrementItem,
    decrementItem,
    applyCoupon,
    removeCoupon,
    setAddress,
    clearCart,
    fetchCart,
    refreshCart: fetchCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}