const GST_RATE = Number(process.env.GST_RATE || 18) / 100
const DELIVERY_FEE = Number(process.env.DELIVERY_FEE || 49)
const FREE_DELIVERY_THRESHOLD = Number(process.env.FREE_DELIVERY_THRESHOLD || 500)

function gstBreakup(taxableAmount) {
  const total = taxableAmount * GST_RATE
  return {
    cgst: total / 2,
    sgst: total / 2,
    total
  }
}

function computeDeliveryFee(taxableAmount) {
  return taxableAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}

// Recomputes subtotal/discount/gst/delivery/total server-side from the
// authoritative product prices, rather than trusting client-sent totals.
function priceCart(items, coupon) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = coupon ? Math.round((subtotal * coupon.percentOff) / 100) : 0
  const taxable = subtotal - discount
  const gst = gstBreakup(taxable)
  const deliveryFee = computeDeliveryFee(taxable)
  const total = taxable + gst.total + deliveryFee
  return { subtotal, discount, taxable, gst, deliveryFee, total }
}

module.exports = { GST_RATE, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, gstBreakup, computeDeliveryFee, priceCart }
