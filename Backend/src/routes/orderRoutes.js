const express = require('express')
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders
} = require('../controllers/orderController')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

router.use(protect)

router.get('/admin/all', admin, getAllOrders)

router.post('/', placeOrder)
router.get('/', getMyOrders)
router.get('/:orderId', getOrderById)
router.patch('/:orderId/cancel', cancelOrder)

module.exports = router
