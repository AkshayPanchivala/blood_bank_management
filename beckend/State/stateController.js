const catchAsync = require('../Utils/catchAsync')
const State = require('./stateModel')

const addState = catchAsync(async (req, res) => {
	await State.create(req.body)

	res.status(201).json({
		message: 'State added successfully.',
	})
})

const getStates = catchAsync(async (req, res) => {
	const states = await State.find()

	res.status(200).json(states)
})

module.exports = {
	addState,
	getStates,
}
