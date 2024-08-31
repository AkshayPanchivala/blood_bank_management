const express = require('express')
const {
	increaseStock,
	getStock,
	updatStock,
} = require('./bloodStockController')
const { selectBloodbankModel } = require('../Common/Middlewares/selectModels')
const { protect } = require('../Login_And_Authentication/authMiddleware')
const router = express.Router()

router.route('/getstock').get(selectBloodbankModel, protect, getStock)

router.route('/updatestock').patch(selectBloodbankModel, protect, updatStock)

module.exports = router
