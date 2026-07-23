const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email, and password are required')
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    res.status(400)
    throw new Error('An account with that email already exists')
  }

  const user = await User.create({ name, email, password, phone })
  const token = generateToken(res, user._id)

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  })
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const token = generateToken(res, user._id)

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token
  })
})

// @desc    Logout user (clears the auth cookie)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'circuit_co_token')
  res.json({ message: 'Logged out' })
})

// @desc    Get current logged-in user's profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user })
})

// @desc    Update current user's profile (name, phone, addresses)
// @route   PUT /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (req.body.name !== undefined) user.name = req.body.name
  if (req.body.phone !== undefined) user.phone = req.body.phone
  if (req.body.addresses !== undefined) user.addresses = req.body.addresses

  const updated = await user.save()
  res.json({
    user: { id: updated._id, name: updated.name, email: updated.email, phone: updated.phone, addresses: updated.addresses }
  })
})

module.exports = { registerUser, loginUser, logoutUser, getMe, updateMe }
