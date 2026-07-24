function loadCoupons() {
  const env = import.meta.env
  const coupons = {}

  for (const key of Object.keys(env)) {
    const match = key.match(/^VITE_COUPON_(.+)$/)
    if (!match) continue

    const code = match[1].toUpperCase()
    const percentOff = Number(env[key])
    if (!code || !Number.isFinite(percentOff) || percentOff <= 0) continue

    coupons[code] = { code, percentOff: Math.min(percentOff, 100) }
  }

  return coupons
}

export const COUPONS = loadCoupons()

export function findCoupon(rawCode) {
  const code = (rawCode || '').trim().toUpperCase()
  return COUPONS[code] || null
}
