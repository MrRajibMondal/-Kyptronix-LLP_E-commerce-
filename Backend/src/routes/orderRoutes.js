const express = require('express')
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController')
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)

router.post('/', placeOrder)
router.get('/', getMyOrders)
router.get('/:orderId', getOrderById)
router.patch('/:orderId/cancel', cancelOrder)

module.exports = router
