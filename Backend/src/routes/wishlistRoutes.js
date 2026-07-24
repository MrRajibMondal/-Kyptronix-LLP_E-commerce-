const express = require('express')
const { getWishlist, toggleWishlist, removeFromWishlist } = require('../controllers/wishlistController')
<<<<<<< HEAD
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)
=======
const { protect } = require('../middleware/auth')

const router = express.Router()

router.use(protect)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58

router.get('/', getWishlist)
router.post('/toggle', toggleWishlist)
router.delete('/:productId', removeFromWishlist)

module.exports = router
