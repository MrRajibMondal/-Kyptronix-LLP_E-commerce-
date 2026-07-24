// Mirrors the frontend's src/data/coupons.js pattern: every coupon is one
// env var, COUPON_<CODE>=<percent off>. Nothing is hardcoded here.

function loadCoupons() {
  const coupons = {}

  for (const key of Object.keys(process.env)) {
    const match = key.match(/^COUPON_(.+)$/)
    if (!match) continue

    const code = match[1].toUpperCase()
    const percentOff = Number(process.env[key])
    if (!code || !Number.isFinite(percentOff) || percentOff <= 0) continue

    coupons[code] = { code, percentOff: Math.min(percentOff, 100) }
  }

  return coupons
}

const COUPONS = loadCoupons()

function findCoupon(rawCode) {
  const code = (rawCode || '').trim().toUpperCase()
  return COUPONS[code] || null
}

module.exports = { COUPONS, findCoupon }
