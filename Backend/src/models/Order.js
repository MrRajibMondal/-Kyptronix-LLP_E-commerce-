const mongoose = require('mongoose')

const CANCEL_REASONS = [
  'Ordered by mistake',
  'Found a better price elsewhere',
  'Delivery is taking too long',
  'Changed my mind',
  'Item no longer needed',
  'Other'
]

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
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

function genOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `CC-${stamp}-${rand}`
}

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, default: genOrderId },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true, validate: (v) => v.length > 0 },
    address: { type: addressSchema, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    gst: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    coupon: {
      code: { type: String },
      percentOff: { type: Number }
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    status: { type: String, enum: ['placed', 'cancelled'], default: 'placed' },
    placedAt: { type: Date, default: Date.now },
    cancelledAt: { type: Date, default: null },
    cancelReason: { type: String, enum: [...CANCEL_REASONS, null], default: null },
    cancelNote: { type: String, default: '' },
    movedToWishlist: { type: Boolean, default: false }
  },
  { timestamps: true }
)

orderSchema.statics.CANCEL_REASONS = CANCEL_REASONS

module.exports = mongoose.model('Order', orderSchema)
