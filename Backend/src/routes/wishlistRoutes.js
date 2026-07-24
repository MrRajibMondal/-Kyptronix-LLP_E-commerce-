const express = require('express')
const { getWishlist, toggleWishlist, removeFromWishlist } = require('../controllers/wishlistController')
const { identifyGuest } = require('../middleware/guest')

const router = express.Router()

router.use(identifyGuest)

router.get('/', getWishlist)
router.post('/toggle', toggleWishlist)
router.delete('/:productId', removeFromWishlist)

module.exports = router
