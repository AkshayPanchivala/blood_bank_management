const { increaseStock } = require('../BloodStock/bloodStockController')
const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const DonateRequests = require('./bloodDonateModel')

const checkifDonateOrNot = async (id) => {
	const data = await DonateRequests.find({ userId: id, status: 'Fulfilled' })
		.sort({ whenToGive: -1 })
		.limit(1)

	if (data.length === 0) {
		return true
	}

	const date = data[0]?.whenToGive
	const curDate = new Date()

	const diffTime = Math.abs(curDate - date)
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	if (diffDays < 90) {
		return false
	}

	return true
}

const addRequest = catchAsync(async (req, res) => {
	const isEligible = await checkifDonateOrNot(req.user._id)

	if (!isEligible) {
		return res.status(404).json({
			message:
				'You are not eligible to donate blood. You can donate after 90 days of your last blood donation.',
		})
	}

	const dataFind = await DonateRequests.find({
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

	await DonateRequests.create(req.body)

	return res.status(201).json({
		message: 'Request sent.',
	})
})

const acceptRequest = catchAsync(async (req, res) => {
	await DonateRequests.findByIdAndUpdate(
		req.body.id,
		{ status: 'Accepted', whenToGive: req.body.whenToGive },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Accepted.',
	})
})

const rejectRequest = catchAsync(async (req, res) => {
	await DonateRequests.findByIdAndUpdate(
		req.body.id,
		{ status: 'Rejected', message: 'Rejected by Bloodbank.' },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Rejected.',
	})
})

const editDonateRequest = catchAsync(async (req, res) => {
	await DonateRequests.findByIdAndUpdate(
		req.body.id,
		{ whenToGive: req.body.whenToGive, bloodType: req.body.bloodType },
		{ new: true }
	)

	return res.status(200).json({
		message: 'Request Edited.',
	})
})

const rejectRequestByUser = catchAsync(async (req, res) => {
	await DonateRequests.findByIdAndUpdate(
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

	await DonateRequests.findByIdAndUpdate(
		req.body.id,
		{
			status: 'Fulfilled',
			whenToGive: req.body.whenToGive,
			bloodType: req.body.bloodType,
		},
		{ new: true }
	)

	await increaseStock(req.user._id, req.body.bloodType)

	return res.status(200).json({
		message: 'Request Fulfilled.',
	})
})

const getUserData = catchAsync(async (req, res) => {
	const query = req.query

	const donateRequests = await DonateRequests.find({ userId: req.user._id })
		.find(query)
		.populate({ path: 'bloodbankId' })

	const data = donateRequests.map((element, index) => {
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
			whenToGive: element.whenToGive,
			status: element.status,
			message: element.message,
		}
	})

	return res.status(200).json(data)
})

const getBloodbankData = catchAsync(async (req, res) => {
	const donateRequests = await DonateRequests.find({
		bloodbankId: req.user._id,
	}).populate({ path: 'userId' })

	const data = donateRequests.map((element, index) => {
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
			whenToGive: element.whenToGive,
			status: element.status,
			message: element.message,
		}
	})

	return res.status(200).json(data)
})

const getUserStates = catchAsync(async (req, res) => {
	const userStates = await DonateRequests.aggregate([
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

const getBloodbankStates = catchAsync(async (req, res) => {
	const userStates = await DonateRequests.aggregate([
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

const getBloodbankDataQuery = catchAsync(async (req, res) => {
	const query = req.query

	const data = await DonateRequests.find({ bloodbankId: req.user._id })
		.find(query)
		.populate({ path: 'userId' })

	return res.status(200).json(data)
})

module.exports = {
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
}
