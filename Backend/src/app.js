const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
<<<<<<< HEAD

=======
const rateLimit = require('express-rate-limit')

const authRoutes = require('./routes/authRoutes')
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const couponRoutes = require('./routes/couponRoutes')
const orderRoutes = require('./routes/orderRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

<<<<<<< HEAD
=======
// Basic protection against brute-force on auth endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false
})
app.use('/api/auth', authLimiter)

>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: process.env.STORE_NAME || 'Circuit & Co.' })
})

<<<<<<< HEAD
=======
app.use('/api/auth', authRoutes)
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/wishlist', wishlistRoutes)

app.use(notFound)
app.use(errorHandler)

<<<<<<< HEAD
module.exports = app
=======
module.exports = app
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
