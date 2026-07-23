const express = require('express')
const {
  getCart,
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  applyCoupon,
  removeCoupon,
  setAddress,
  clearItems,
  clearCart
} = require('../controllers/cartController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.use(protect)

router.get('/', getCart)
router.post('/items', addItem)
router.delete('/items', clearItems)
router.delete('/items/:productId', removeItem)
router.patch('/items/:productId/increment', incrementItem)
router.patch('/items/:productId/decrement', decrementItem)
router.post('/coupon', applyCoupon)
router.delete('/coupon', removeCoupon)
router.put('/address', setAddress)
router.post('/clear', clearCart)

module.exports = router
