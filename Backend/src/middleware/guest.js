const mongoose = require('mongoose')

const GUEST_COOKIE = process.env.GUEST_COOKIE_NAME || 'circuit_co_guest'
const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365

const identifyGuest = (req, res, next) => {
  let guestId = req.cookies?.[GUEST_COOKIE]

  if (!guestId || !mongoose.Types.ObjectId.isValid(guestId)) {
    guestId = new mongoose.Types.ObjectId().toString()
    res.cookie(GUEST_COOKIE, guestId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: ONE_YEAR_MS
    })
  }

  req.user = { _id: guestId }
  next()
}

module.exports = { identifyGuest }