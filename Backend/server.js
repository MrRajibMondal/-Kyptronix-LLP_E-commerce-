require('dotenv').config()
const connectDB = require('./src/config/db')
const app = require('./src/app')

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Circuit & Co. backend running on port ${PORT} (${process.env.NODE_ENV || 'development'})`)
  })

  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.message}`)
    server.close(() => process.exit(1))
  })
})
