const express = require('express')
const { getWishlist, toggleWishlist, removeFromWishlist } = require('../controllers/wishlistController')
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

router.get('/', getWishlist)
router.post('/toggle', toggleWishlist)
router.delete('/:productId', removeFromWishlist)

module.exports = router
