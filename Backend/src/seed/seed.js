require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Product = require('../models/Product')
<<<<<<< HEAD
=======
const User = require('../models/User')
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
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

<<<<<<< HEAD
=======
  const adminEmail = 'admin@circuitco.test'
  const existingAdmin = await User.findOne({ email: adminEmail })
  if (!existingAdmin) {
    await User.create({
      name: 'Store Admin',
      email: adminEmail,
      password: 'ChangeMe123!',
      role: 'admin'
    })
    console.log(`Seeded admin user: ${adminEmail} / ChangeMe123! (please change this password)`)
  }

>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
  await mongoose.connection.close()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
