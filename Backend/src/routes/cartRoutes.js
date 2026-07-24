const express = require('express')
const {
  getCart,
  addItem,
  removeItem,
  setItemQuantity,
  incrementItem,
  decrementItem,
  applyCoupon,
  removeCoupon,
  setAddress,
  clearItems,
  clearCart
} = require('../controllers/cartController')
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)

router.get('/', getCart)
router.post('/items', addItem)
router.delete('/items', clearItems)
router.delete('/items/:productId', removeItem)
router.put('/items/:productId', setItemQuantity)
router.patch('/items/:productId/increment', incrementItem)
router.patch('/items/:productId/decrement', decrementItem)
router.post('/coupon', applyCoupon)
router.delete('/coupon', removeCoupon)
router.put('/address', setAddress)
router.post('/clear', clearCart)

module.exports = router