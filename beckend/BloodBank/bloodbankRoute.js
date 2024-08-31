const express = require('express')
const router = express.Router()
const {
	registerBloodbank,
	getBloodbankProfile,
	getBloodbanks,
	getBloodbankById,
	getBloodbanksByQuery,
} = require('./bloodbankController')
const { registerMiddleware } = require('./bloodbankMiddleware')
const { login, loginMiddleware } = require('../Login_And_Authentication/login')
const {
	selectBloodbankModel,
	selectAdminModel,
} = require('../Common/Middlewares/selectModels')
const { protect } = require('../Login_And_Authentication/authMiddleware')
const {
	updatePasswordMiddleware,
	updatePassword,
} = require('../Login_And_Authentication/updatePassword')
const { forgotPassword, resetPassword } = require('../Login_And_Authentication/forgotPassword')

router
	.route('/register')
	.post(selectAdminModel, protect, registerMiddleware, registerBloodbank)

router.use(selectBloodbankModel)

router.route('/login').post(loginMiddleware, login)

router.route('/getbloodbankprofile').get(protect, getBloodbankProfile)

router.route('/getbloodbanks').get(getBloodbanks)

router.route('/getbloodbanksbyquery').get(getBloodbanksByQuery)

router.route('/getbloodbankbyid/:id').get(getBloodbankById)

router.route('/forgotpassword').post(forgotPassword)

router.route('/resetpassword/:token').patch(resetPassword)

router
	.route('/updatepassword')
	.patch(
		selectBloodbankModel,
		protect,
		updatePasswordMiddleware,
		updatePassword
	)

module.exports = router
