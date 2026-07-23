const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true }, // slug, e.g. 'wireless-mouse'
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, min: 0 },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    specs: [[{ type: String }]], // array of [label, value] pairs
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 100, min: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', category: 'text', tagline: 'text' })

module.exports = mongoose.model('Product', productSchema)
