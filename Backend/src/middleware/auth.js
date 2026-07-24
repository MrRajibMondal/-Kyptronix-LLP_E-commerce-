const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// Reads the token from the httpOnly cookie, or from an Authorization: Bearer header.
const protect = asyncHandler(async (req, res, next) => {
  const cookieName = process.env.COOKIE_NAME || 'circuit_co_token'
  let token = req.cookies?.[cookieName]

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    if (!req.user) {
      res.status(401)
      throw new Error('Not authorized, user not found')
    }
    next()
  } catch (err) {
    res.status(401)
    throw new Error('Not authorized, token failed')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next()
  res.status(403)
  throw new Error('Not authorized as an admin')
}

module.exports = { protect, admin }
