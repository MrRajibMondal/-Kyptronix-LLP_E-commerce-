const express = require('express')
const {
  getCart,
  addItem,
  removeItem,
<<<<<<< HEAD
  setItemQuantity,
=======
<<<<<<< HEAD
  setItemQuantity,
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
  incrementItem,
  decrementItem,
  applyCoupon,
  removeCoupon,
  setAddress,
  clearItems,
  clearCart
} = require('../controllers/cartController')
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)
<<<<<<< HEAD
=======
=======
const { protect } = require('../middleware/auth')

const router = express.Router()

router.use(protect)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

router.get('/', getCart)
router.post('/items', addItem)
router.delete('/items', clearItems)
router.delete('/items/:productId', removeItem)
<<<<<<< HEAD
router.put('/items/:productId', setItemQuantity)
=======
<<<<<<< HEAD
router.put('/items/:productId', setItemQuantity)
=======
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
router.patch('/items/:productId/increment', incrementItem)
router.patch('/items/:productId/decrement', decrementItem)
router.post('/coupon', applyCoupon)
router.delete('/coupon', removeCoupon)
router.put('/address', setAddress)
router.post('/clear', clearCart)

<<<<<<< HEAD
module.exports = router
=======
<<<<<<< HEAD
module.exports = router
=======
module.exports = router
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
