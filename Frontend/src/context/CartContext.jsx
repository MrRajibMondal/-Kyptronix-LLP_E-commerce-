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
<<<<<<< HEAD
      if (!saved) return null
      const parsed = JSON.parse(saved)
      return parsed ? { ...parsed, type: (parsed.type || 'home').toLowerCase() } : null
=======
<<<<<<< HEAD
      if (!saved) return null
      const parsed = JSON.parse(saved)
      return parsed ? { ...parsed, type: (parsed.type || 'home').toLowerCase() } : null
=======
      return saved ? JSON.parse(saved) : null
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    } catch {
      return null
    }
  })

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  // Helper to extract the product's slug id (e.g. "wireless-mouse").
  // IMPORTANT: check `.id` (the slug your backend looks products up by)
  // BEFORE `._id` (Mongo's internal id) — products from the API have both,
  // and sending `_id` to the backend causes a 404 on /cart/items because
  // the backend queries `Product.findOne({ id: productId })`.
  const getProductId = (product) => {
    if (!product) return ''
    if (typeof product === 'string') return product
    return product.id || product._id || ''
  }

  // 1. Fetch Cart from Backend on Load
<<<<<<< HEAD
=======
=======
  // Helper to extract clean product string ID
  const getProductId = (product) => {
    if (!product) return ''
    if (typeof product === 'string') return product
    return product._id || product.id || ''
  }

  // 1. Fetch Cart from Backend on Load (Silently handles 401 for guests)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await API.get('/cart')
      const backendCart = res.data
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

      const rawItems = backendCart?.items || (Array.isArray(backendCart) ? backendCart : [])
      if (Array.isArray(rawItems)) {
        setCartItems(rawItems)
      }

      setCoupon(backendCart?.coupon || null)
      setDiscountAmount(backendCart?.discountAmount || backendCart?.discount || 0)
    } catch (err) {
      console.error('Error fetching backend cart:', err)
<<<<<<< HEAD
=======
=======
      
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
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    // Optimistic UI Update
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
            product: typeof product === 'object' ? product : { id: pId },
=======
<<<<<<< HEAD
            product: typeof product === 'object' ? product : { id: pId },
=======
            product: typeof product === 'object' ? product : { _id: pId },
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
            quantity: addQty,
            qty: addQty,
          },
        ]
      }
    })

    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const res = await API.post('/cart/items', { productId: pId, qty: addQty })
      if (res.data?.items) {
        setCartItems(res.data.items)
        setCoupon(res.data.coupon || null)
        setDiscountAmount(res.data.discount || 0)
      }
    } catch (err) {
      console.error('Error adding item to cart on backend:', err)
    }
  }

<<<<<<< HEAD
=======
=======
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
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  const addToCart = addItem

  // 5. Remove Item from Cart
  const removeItem = async (productId) => {
    const pId = getProductId(productId)

    setCartItems((prev) => prev.filter((item) => getProductId(item.product || item) !== pId))

    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const res = await API.delete(`/cart/items/${pId}`)
      if (res.data?.items) {
        setCartItems(res.data.items)
        setCoupon(res.data.coupon || null)
        setDiscountAmount(res.data.discount || 0)
      }
    } catch (err) {
      console.error('Error removing item from backend cart:', err)
    }
  }

<<<<<<< HEAD
=======
=======
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
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      const res = await API.put(`/cart/items/${pId}`, { quantity })
      if (res.data?.items) {
        setCartItems(res.data.items)
        setCoupon(res.data.coupon || null)
        setDiscountAmount(res.data.discount || 0)
      }
    } catch (err) {
      console.error('Error updating cart item on backend:', err)
<<<<<<< HEAD
=======
=======
      const res = await API.put(`/cart/${pId}`, { quantity })
      if (res.data?.items) {
        setCartItems(res.data.items)
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error updating cart item on backend:', err)
      }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    }
  }

  const incrementItem = (productId) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    const found = items.find((i) => i.id === getProductId(productId))
    if (found) updateQuantity(found.id, found.qty + 1)
  }

  const decrementItem = (productId) => {
    const found = items.find((i) => i.id === getProductId(productId))
    if (found) {
      if (found.qty <= 1) removeItem(found.id)
      else updateQuantity(found.id, found.qty - 1)
    }
  }

  // NEW: single source of truth for "is this product in the cart, and at what qty".
  // Accepts a raw product object (with `.id` and/or `._id`), or a bare id string —
  // so any card component (product grid, wishlist, search dropdown, etc.) can use
  // the exact same lookup logic the cart itself uses, instead of re-implementing
  // (and mismatching) the id comparison on its own.
  const getQtyInCart = (productOrId) => {
    const pId = getProductId(productOrId)
    if (!pId) return 0
    const found = items.find((i) => i.id === pId)
    return found ? found.qty : 0
  }

  const isInCart = (productOrId) => getQtyInCart(productOrId) > 0

<<<<<<< HEAD
=======
=======
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

>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  // 7. Apply & Remove Coupon
  const applyCoupon = async (code) => {
    try {
      setCouponError('')
      const res = await API.post('/cart/coupon', { code })
      if (res.data?.items) setCartItems(res.data.items)
      if (res.data?.coupon) setCoupon(res.data.coupon)
<<<<<<< HEAD
      setDiscountAmount(res.data?.discount || 0)
=======
<<<<<<< HEAD
      setDiscountAmount(res.data?.discount || 0)
=======
      if (res.data?.discountAmount) setDiscountAmount(res.data.discountAmount)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    const normalized = newAddress
      ? { ...newAddress, type: (newAddress.type || 'home').toLowerCase() }
      : null

    setAddressState(normalized)
    if (normalized) {
      localStorage.setItem('checkout_address', JSON.stringify(normalized))
      API.put('/cart/address', normalized).catch((err) => {
        console.error('Error saving address to backend cart:', err)
      })
<<<<<<< HEAD
=======
=======
    setAddressState(newAddress)
    if (newAddress) {
      localStorage.setItem('checkout_address', JSON.stringify(newAddress))
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
      await API.post('/cart/clear')
    } catch (err) {
      console.error('Error clearing backend cart:', err)
    }
  }

<<<<<<< HEAD
=======
=======
      await API.delete('/cart')
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error clearing backend cart:', err)
      }
    }
  }

  // Price & Total Calculations
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  // Backward-compatible Reducer Dispatch Handler
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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
<<<<<<< HEAD
    getQtyInCart,
    isInCart,
=======
<<<<<<< HEAD
    getQtyInCart,
    isInCart,
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
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