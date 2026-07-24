const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // product id/slug
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    qty: { type: Number, required: true, min: 1 }
  },
  { _id: false }
)

const addressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' }
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    coupon: {
      code: { type: String },
      percentOff: { type: Number }
    },
    address: addressSchema
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
