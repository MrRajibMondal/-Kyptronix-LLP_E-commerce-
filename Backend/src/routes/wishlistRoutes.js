const express = require('express')
const { getWishlist, toggleWishlist, removeFromWishlist } = require('../controllers/wishlistController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.use(protect)

router.get('/', getWishlist)
router.post('/toggle', toggleWishlist)
router.delete('/:productId', removeFromWishlist)

module.exports = router
