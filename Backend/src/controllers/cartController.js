const asyncHandler = require('express-async-handler')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { findCoupon } = require('../config/coupons')
const { priceCart } = require('../utils/pricing')

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) cart = await Cart.create({ user: userId, items: [] })
  return cart
}

function serializeCart(cart) {
  const pricing = priceCart(cart.items, cart.coupon?.code ? cart.coupon : null)
  return {
    items: cart.items,
    coupon: cart.coupon?.code ? cart.coupon : null,
    address: cart.address || null,
    itemCount: cart.items.reduce((sum, i) => sum + i.qty, 0),
    ...pricing
  }
}

// @desc    Get the current user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  res.json(serializeCart(cart))
})

// @desc    Add an item to the cart (or increase qty if it already exists)
// @route   POST /api/cart/items
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body
  if (!productId) {
    res.status(400)
    throw new Error('productId is required')
  }

  const product = await Product.findOne({ id: productId, isActive: true })
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  const addQty = qty && qty > 0 ? Number(qty) : 1
  const cart = await getOrCreateCart(req.user._id)

  const existing = cart.items.find((i) => i.id === productId)
  if (existing) {
    existing.qty += addQty
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      qty: addQty
    })
  }

  await cart.save()
  res.status(201).json(serializeCart(cart))
})

// @desc    Remove an item entirely from the cart
// @route   DELETE /api/cart/items/:productId
// @access  Private
const removeItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.items = cart.items.filter((i) => i.id !== req.params.productId)
  // Coupon eligibility is re-evaluated once the cart is empty.
  if (cart.items.length === 0) cart.coupon = undefined
  await cart.save()
  res.json(serializeCart(cart))
})

<<<<<<< HEAD
// @desc    Set an item's quantity directly (used by the +/- stepper in the UI)
// @route   PUT /api/cart/items/:productId
// @access  Public (guest-scoped)
const setItemQuantity = asyncHandler(async (req, res) => {
  const quantity = Number(req.body.quantity)
  if (!quantity || quantity < 1) {
    res.status(400)
    throw new Error('quantity must be a number greater than 0')
  }

  const cart = await getOrCreateCart(req.user._id)
  const item = cart.items.find((i) => i.id === req.params.productId)
  if (!item) {
    res.status(404)
    throw new Error('Item not found in cart')
  }
  item.qty = quantity
  await cart.save()
  res.json(serializeCart(cart))
})

=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
// @desc    Increment an item's quantity by 1
// @route   PATCH /api/cart/items/:productId/increment
// @access  Private
const incrementItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  const item = cart.items.find((i) => i.id === req.params.productId)
  if (!item) {
    res.status(404)
    throw new Error('Item not found in cart')
  }
  item.qty += 1
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Decrement an item's quantity by 1 (removes it if it hits 0)
// @route   PATCH /api/cart/items/:productId/decrement
// @access  Private
const decrementItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  const item = cart.items.find((i) => i.id === req.params.productId)
  if (!item) {
    res.status(404)
    throw new Error('Item not found in cart')
  }
  item.qty -= 1
  cart.items = cart.items.filter((i) => i.qty > 0)
  if (cart.items.length === 0) cart.coupon = undefined
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Apply a coupon code to the cart
// @route   POST /api/cart/coupon
// @access  Private
const applyCoupon = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)

  if (cart.coupon?.code) {
    res.status(400)
    throw new Error('A coupon has already been applied to this order.')
  }

  const found = findCoupon(req.body.code)
  if (!found) {
    res.status(400)
    throw new Error('That coupon code is not valid.')
  }

  cart.coupon = found
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Remove the coupon from the cart
// @route   DELETE /api/cart/coupon
// @access  Private
const removeCoupon = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.coupon = undefined
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Set the delivery address on the cart (used during checkout)
// @route   PUT /api/cart/address
// @access  Private
const setAddress = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.address = req.body
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Remove all items (and the coupon) but keep the cart document
// @route   DELETE /api/cart/items
// @access  Private
const clearItems = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.items = []
  cart.coupon = undefined
  await cart.save()
  res.json(serializeCart(cart))
})

// @desc    Full reset — items, coupon, and address (used right after an order is placed)
// @route   POST /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id)
  cart.items = []
  cart.coupon = undefined
  cart.address = undefined
  await cart.save()
  res.json(serializeCart(cart))
})

module.exports = {
  getCart,
  addItem,
  removeItem,
<<<<<<< HEAD
  setItemQuantity,
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
  incrementItem,
  decrementItem,
  applyCoupon,
  removeCoupon,
  setAddress,
  clearItems,
  clearCart
}
