const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')

// @desc    List products (optional ?category= & ?search= & pagination)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query
  const query = { isActive: true }

  if (category) query.category = category
  if (search) query.$text = { $search: search }

  const pageNum = Math.max(1, Number(page))
  const limitNum = Math.min(100, Math.max(1, Number(limit)))

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(query)
  ])

  res.json({
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    total
  })
})

// @desc    Get list of distinct categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category', { isActive: true })
  res.json({ categories })
})

// @desc    Get a single product by its slug id (e.g. 'wireless-mouse')
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id, isActive: true })
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.json({ product })
})

// @desc    Get related products (same category, excluding the given id)
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const count = Math.min(20, Number(req.query.count) || 3)
  const current = await Product.findOne({ id: req.params.id })

  const query = { id: { $ne: req.params.id }, isActive: true }
  if (current) query.category = current.category

  let related = await Product.find(query).limit(count)

  // Fall back to any other products if the category doesn't have enough.
  if (related.length < count) {
    const excludeIds = [req.params.id, ...related.map((p) => p.id)]
    const extra = await Product.find({ id: { $nin: excludeIds }, isActive: true }).limit(
      count - related.length
    )
    related = [...related, ...extra]
  }

  res.json({ products: related })
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json({ product })
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  })
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.json({ product })
})

// @desc    Delete (soft-delete) a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { id: req.params.id },
    { isActive: false },
    { new: true }
  )
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.json({ message: 'Product deleted' })
})

module.exports = {
  getProducts,
  getCategories,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
