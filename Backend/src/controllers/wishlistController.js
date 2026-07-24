const asyncHandler = require('express-async-handler')
const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId })
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, productIds: [] })
  return wishlist
}

// @desc    Get the current user's wishlist (with full product details)
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id)
  const products = await Product.find({ id: { $in: wishlist.productIds }, isActive: true })
  res.json({ ids: wishlist.productIds, products })
})

// @desc    Toggle a product in/out of the wishlist
// @route   POST /api/wishlist/toggle
// @access  Private
const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body
  if (!productId) {
    res.status(400)
    throw new Error('productId is required')
  }

  const wishlist = await getOrCreateWishlist(req.user._id)
  if (wishlist.productIds.includes(productId)) {
    wishlist.productIds = wishlist.productIds.filter((id) => id !== productId)
  } else {
    wishlist.productIds.push(productId)
  }
  await wishlist.save()
  res.json({ ids: wishlist.productIds })
})

// @desc    Remove a single product from the wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id)
  wishlist.productIds = wishlist.productIds.filter((id) => id !== req.params.productId)
  await wishlist.save()
  res.json({ ids: wishlist.productIds })
})

module.exports = { getWishlist, toggleWishlist, removeFromWishlist }
