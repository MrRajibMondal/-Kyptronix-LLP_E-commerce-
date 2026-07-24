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

const router = express.Router()

router.get('/', getProducts)
router.get('/categories', getCategories)
router.get('/:id', getProductById)
router.get('/:id/related', getRelatedProducts)

// No authentication in this app — these write routes are open. If this ever
// goes anywhere near production, put an auth/admin check back in front of them.
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
