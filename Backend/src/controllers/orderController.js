const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Wishlist = require('../models/Wishlist')
const { priceCart } = require('../utils/pricing')

// @desc    Place an order from the current cart, then clear the cart
// @route   POST /api/orders
// @access  Private
const placeOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })

  if (!cart || cart.items.length === 0) {
    res.status(400)
    throw new Error('Your cart is empty, so there is nothing to check out.')
  }

  const address = req.body.address || cart.address
  if (!address || !address.line1 || !address.city || !address.pincode) {
    res.status(400)
    throw new Error('A delivery address is required to place an order.')
  }

  // Recompute pricing from the authoritative cart rather than trusting the client.
  const pricing = priceCart(cart.items, cart.coupon?.code ? cart.coupon : null)

  const order = await Order.create({
    user: req.user._id,
    items: cart.items,
    address,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    gst: pricing.gst.total,
    deliveryFee: pricing.deliveryFee,
    total: pricing.total,
    coupon: cart.coupon?.code ? cart.coupon : undefined,
    paymentMethod: req.body.paymentMethod || 'Cash on Delivery'
  })

  // Mirrors the frontend's CLEAR_CART behavior once the order is placed.
  cart.items = []
  cart.coupon = undefined
  cart.address = undefined
  await cart.save()

  res.status(201).json({ orderId: order.orderId, order })
})

// @desc    List the current user's orders (most recent first)
// @route   GET /api/orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ placedAt: -1 })
  res.json({ orders })
})

// @desc    Get a single order by its human-readable orderId (e.g. CC-XXXX)
// @route   GET /api/orders/:orderId
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId })

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  const isOwner = order.user.toString() === req.user._id.toString()
<<<<<<< HEAD
  if (!isOwner) {
=======
<<<<<<< HEAD
  if (!isOwner) {
=======
  if (!isOwner && req.user.role !== 'admin') {
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
    res.status(403)
    throw new Error('Not authorized to view this order')
  }

  res.json({ order })
})

// @desc    Cancel a placed order, optionally moving its items to the wishlist
// @route   PATCH /api/orders/:orderId/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const { reason, note, moveToWishlist } = req.body

  if (!Order.CANCEL_REASONS.includes(reason)) {
    res.status(400)
    throw new Error(`reason must be one of: ${Order.CANCEL_REASONS.join(', ')}`)
  }

  const order = await Order.findOne({ orderId: req.params.orderId })
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error('Not authorized to cancel this order')
  }
  if (order.status === 'cancelled') {
    res.status(400)
    throw new Error('This order has already been cancelled')
  }

  order.status = 'cancelled'
  order.cancelledAt = new Date()
  order.cancelReason = reason
  order.cancelNote = note || ''
  order.movedToWishlist = !!moveToWishlist
  await order.save()

  if (moveToWishlist) {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, productIds: [] })
    const newIds = order.items.map((i) => i.id).filter((id) => !wishlist.productIds.includes(id))
    wishlist.productIds.push(...newIds)
    await wishlist.save()
  }

  res.json({ order })
})

<<<<<<< HEAD
module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder }
=======
<<<<<<< HEAD
module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder }
=======
// @desc    List all orders (admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ placedAt: -1 }).populate('user', 'name email')
  res.json({ orders })
})

module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders }
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
