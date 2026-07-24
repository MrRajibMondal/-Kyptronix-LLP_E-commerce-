export function formatINR(amount) {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

export function discountPercent(price, mrp) {
  if (!mrp || mrp <= price) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

// GST split evenly across CGST + SGST, as shown on most Indian invoices.
export const GST_RATE = 0.18

export function gstBreakup(taxableAmount) {
  const total = taxableAmount * GST_RATE
  return {
    cgst: total / 2,
    sgst: total / 2,
    total
  }
}

export const FREE_DELIVERY_THRESHOLD = 500
export const DELIVERY_FEE = 49
