const express = require('express')
const {
  getProducts,
  getCategories,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
const { protect, admin } = require('../middleware/auth')
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

const router = express.Router()

router.get('/', getProducts)
router.get('/categories', getCategories)
router.get('/:id', getProductById)
router.get('/:id/related', getRelatedProducts)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70
// No authentication in this app — these write routes are open. If this ever
// goes anywhere near production, put an auth/admin check back in front of them.
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
<<<<<<< HEAD
=======
=======
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
>>>>>>> 71332330338963d4802b4ab68da0a73031b78f70

module.exports = router
