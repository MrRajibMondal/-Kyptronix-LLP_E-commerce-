require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Product = require('../models/Product')
const { PRODUCTS } = require('./productsData')

async function run() {
  await connectDB()

  if (process.argv.includes('--destroy')) {
    await Product.deleteMany({})
    console.log('Products cleared.')
    await mongoose.connection.close()
    return
  }

  await Product.deleteMany({})
  await Product.insertMany(PRODUCTS)
  console.log(`Seeded ${PRODUCTS.length} products.`)

  await mongoose.connection.close()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
