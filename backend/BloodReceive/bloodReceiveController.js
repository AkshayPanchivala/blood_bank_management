const {
	checkAvailability,
	decreaseStock,
} = require('../BloodStock/bloodStockController')
const catchAsync = require('../Utils/catchAsync')
const ReceiveRequests = require('./bloodReceiveModel')
const AppError = require('../Utils/appError')

const addRequest = catchAsync(async (req, res) => {
	const dataFind = await ReceiveRequests.find({
		userId: req.user._id,
		bloodbankId: req.body.bloodbankId,
	})
		.sort({ whenToGive: -1 })
		.limit(1)

	if (dataFind.length !== 0) {
		if (
			dataFind[0].status === 'Pending' ||
			dataFind[0].status === 'Accepted'
		) {
			return res.status(404).json({
				message:
					'You already sent request please wait for bloodbank response.',
			})
		}
	}

	Object.assign(req.body, { userId: req.user._id })

	await ReceiveRequests.create(req.body)

	return res.status(201).json({
		message: 'Request sent.',
	})
})

const acceptRequest = catchAsync(async (req, res) => {
	await ReceiveRequests.findByIdAndUpdate(
		req.body.id,
		{ status: 'Accepted' },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Accepted.',
	})
})

const rejectRequest = catchAsync(async (req, res) => {
	await ReceiveRequests.findByIdAndUpdate(
		req.body.id,
		{ status: 'Rejected', message: 'Rejected by Bloodbank.' },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Rejected.',
	})
})

const editReceiveRequest = catchAsync(async (req, res) => {
	await ReceiveRequests.findByIdAndUpdate(
		req.body.id,
		{
			whenDoYouWant: req.body.whenDoYouWant,
			bloodType: req.body.bloodType,
			unit: req.body.unit,
		},
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Edited.',
	})
})

const rejectRequestByUser = catchAsync(async (req, res) => {
	await ReceiveRequests.findByIdAndUpdate(
		req.body.id,
		{ status: 'Rejected', message: 'Rejected by User.' },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Rejected.',
	})
})

const fulfilledRequest = catchAsync(async (req, res, next) => {
	if (!req.body.bloodType) {
		return next(new AppError('Provide Blood Type.', 404))
	}

	const isAvailable = await checkAvailability(
		req.user._id,
		req.body.bloodType,
		req.body.unit
	)

	if (!isAvailable) {
		return next(
			new AppError('You can not give Blood unit more then you have', 404)
		)
	}

	await ReceiveRequests.findByIdAndUpdate(
		req.body.id,
		{
			status: 'Fulfilled',
			whenDoYouWant: req.body.whenDoYouWant,
			bloodType: req.body.bloodType,
		},
		{ new: true }
	)

	await decreaseStock(req.user._id, req.body.bloodType, req.body.unit)

	return res.status(200).json({
		message: 'Request Fulfilled.',
	})
})

const getUserData = catchAsync(async (req, res) => {
	const query = req.query

	const receiveRequests = await ReceiveRequests.find({ userId: req.user._id })
		.find(query)
		.populate({ path: 'bloodbankId' })

	const data = receiveRequests.map((element, index) => {
		return {
			_id: element._id,
			index: index + 1,
			bloodbankName: element.bloodbankId.bloodbankName,
			category: element.bloodbankId.category,
			contactPerson: element.bloodbankId.contactPerson,
			phoneNo1: element.bloodbankId.phoneNo1,
			email: element.bloodbankId.email,
			address:
				element.bloodbankId.address1 +
				' ' +
				element.bloodbankId.address2,
			pinCode: element.bloodbankId.pinCode,
			city: element.bloodbankId.city,
			state: element.bloodbankId.state,
			bloodType: element.bloodType,
			unit: element.unit,
			whenDoYouWant: element.whenDoYouWant,
			status: element.status,
			message: element.message,
		}
	})

	return res.status(200).json(data)
})

const getBloodbankData = catchAsync(async (req, res) => {
	const receiveRequests = await ReceiveRequests.find({
		bloodbankId: req.user._id,
	}).populate({ path: 'userId' })

	const data = receiveRequests.map((element, index) => {
		return {
			_id: element._id,
			index: index + 1,
			name: element.userId.firstName + ' ' + element.userId.lastName,
			dob: element.userId.dob,
			age: element.userId.age,
			phoneNo1: element.userId.phoneNo1,
			phoneNo2: element.userId.phoneNo2,
			email: element.userId.email,
			address: element.userId.address,
			pinCode: element.userId.pinCode,
			state: element.userId.state,
			city: element.userId.city,
			bloodType: element.bloodType,
			unit: element.unit,
			whenDoYouWant: element.whenDoYouWant,
			status: element.status,
			message: element.message,
		}
	})

	return res.status(200).json(data)
})

const getUserStates = catchAsync(async (req, res, next) => {
	const userStates = await ReceiveRequests.aggregate([
		{
			$match: {
				userId: req.user._id,
			},
		},
		{
			$group: {
				_id: 'donatestates',
				Pending: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Pending'] }, 1, 0],
					},
				},
				Accepted: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Accepted'] }, 1, 0],
					},
				},
				Rejected: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0],
					},
				},
				Fulfilled: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Fulfilled'] }, 1, 0],
					},
				},
			},
		},
	])

	return res.status(200).json(userStates)
})

const getBloodbankStates = catchAsync(async (req, res, next) => {
	const userStates = await ReceiveRequests.aggregate([
		{
			$match: {
				bloodbankId: req.user._id,
			},
		},
		{
			$group: {
				_id: 'donatestates',
				Pending: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Pending'] }, 1, 0],
					},
				},
				Accepted: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Accepted'] }, 1, 0],
					},
				},
				Rejected: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0],
					},
				},
				Fulfilled: {
					$sum: {
						$cond: [{ $eq: ['$status', 'Fulfilled'] }, 1, 0],
					},
				},
			},
		},
	])

	return res.status(200).json(userStates)
})

const getBloodbankDataQuery = catchAsync(async (req, res, next) => {
	const query = req.query

	const data = await ReceiveRequests.find({ bloodbankId: req.user._id })
		.find(query)
		.populate({ path: 'userId' })

	return res.status(200).json(data)
})

module.exports = {
	addRequest,
	acceptRequest,
	rejectRequest,
	editReceiveRequest,
	rejectRequestByUser,
	fulfilledRequest,
	getUserStates,
	getBloodbankStates,
	getUserData,
	getBloodbankData,
	getBloodbankDataQuery,
}
