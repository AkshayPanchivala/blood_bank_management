const catchAsync = require('../Utils/catchAsync')
const City = require('./cityModel')

const addCity = catchAsync(async (req, res) => {
	await City.create(req.body)

	return res.status(201).json({
		message: 'City added successfully.',
	})
})

const getCities = catchAsync(async (req, res) => {
	const cities = await City.find({ stateName: req.params.stateName })

	return res.status(200).json(cities)
})

module.exports = {
	addCity,
	getCities,
}
