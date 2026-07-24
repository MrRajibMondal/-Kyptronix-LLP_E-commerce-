const express = require('express')
const {
  placeOrder,
  getMyOrders,
  getOrderById,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  cancelOrder
} = require('../controllers/orderController')
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)
<<<<<<< HEAD
=======
=======
  cancelOrder,
  getAllOrders
} = require('../controllers/orderController')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

router.use(protect)

router.get('/admin/all', admin, getAllOrders)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

router.post('/', placeOrder)
router.get('/', getMyOrders)
router.get('/:orderId', getOrderById)
router.patch('/:orderId/cancel', cancelOrder)

module.exports = router
