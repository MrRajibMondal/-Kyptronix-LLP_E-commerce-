const asyncHandler = require('express-async-handler')
const { findCoupon } = require('../config/coupons')

// @desc    Check whether a coupon code is valid (does not apply it)
// @route   GET /api/coupons/:code
// @access  Public
const checkCoupon = asyncHandler(async (req, res) => {
  const coupon = findCoupon(req.params.code)
  if (!coupon) {
    res.status(404)
    throw new Error('That coupon code is not valid.')
  }
  res.json({ coupon })
})

module.exports = { checkCoupon }
