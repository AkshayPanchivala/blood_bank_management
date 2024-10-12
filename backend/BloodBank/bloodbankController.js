const { addStock } = require('../BloodStock/bloodStockController')
const catchAsync = require('../Utils/catchAsync')
const { registerBloodbankEmail } = require('../Utils/emailContant')
const Bloodbank = require('./bloodbankModel')

const registerBloodbank = catchAsync(async (req, res) => {
	const bloodbank = await Bloodbank.create(req.body)

	addStock(bloodbank._id)

	await registerBloodbankEmail(
		bloodbank.bloodbankName,
		bloodbank.email,
		req.body.password
	)

	return res.status(201).json({
		message: 'Bloodbank Registered Successfully.',
	})
})

const getBloodbanks = catchAsync(async (req, res) => {
	const bloodbanks = await Bloodbank.find()

	return res.status(200).json(bloodbanks)
})

const getBloodbankById = catchAsync(async (req, res) => {
	const bloodbank = await req.model.findById(req.params.id)

	return res.status(200).json(bloodbank)
})

const getBloodbanksByQuery = catchAsync(async (req, res) => {
	const bloodbanks = await req.model.find(req.query)

	return res.status(200).json(bloodbanks)
})

const getBloodbankProfile = catchAsync(async (req, res) => {
	const user = await req.model.findById(req.user._id)

	return res.status(200).json(user)
})

module.exports = {
	registerBloodbank,
	getBloodbanks,
	getBloodbankById,
	getBloodbanksByQuery,
	getBloodbankProfile,
}
