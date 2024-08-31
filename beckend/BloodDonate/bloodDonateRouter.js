const express = require('express')
const router = express.Router()
const {
	addRequest,
	acceptRequest,
	rejectRequest,
	editDonateRequest,
	rejectRequestByUser,
	fulfilledRequest,
	getUserData,
	getBloodbankData,
	getUserStates,
	getBloodbankStates,
	getBloodbankDataQuery,
} = require('./bloodDonateController')
const {
	selectUserModel,
	selectBloodbankModel,
} = require('../Common/Middlewares/selectModels')
const { protect } = require('../Login_And_Authentication/authMiddleware')

router.route('/addrequest').post(selectUserModel, protect, addRequest)

router
	.route('/acceptrequest')
	.patch(selectBloodbankModel, protect, acceptRequest)

router
	.route('/rejectrequest')
	.patch(selectBloodbankModel, protect, rejectRequest)

router
	.route('/editdonaterequest')
	.patch(selectUserModel, protect, editDonateRequest)

router
	.route('/rejectrequestbyuser')
	.patch(selectUserModel, protect, rejectRequestByUser)

router
	.route('/fulfilledrequest')
	.patch(selectBloodbankModel, protect, fulfilledRequest)

router.route('/getuserstates').get(selectUserModel, protect, getUserStates)

router
	.route('/getbloodbankstates')
	.get(selectBloodbankModel, protect, getBloodbankStates)

router.route('/getuserdata').get(selectUserModel, protect, getUserData)

router
	.route('/getbloodbankdata')
	.get(selectBloodbankModel, protect, getBloodbankData)

router
	.route('/getbloodbankdataquery')
	.get(selectBloodbankModel, protect, getBloodbankDataQuery)

module.exports = router
