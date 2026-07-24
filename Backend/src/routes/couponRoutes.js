const express = require('express')
const { checkCoupon } = require('../controllers/couponController')

const router = express.Router()

router.get('/:code', checkCoupon)

module.exports = router
