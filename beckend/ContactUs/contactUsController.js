const Contactus = require('./contactUsModel')
const catchAsync = require('../Utils/catchAsync')

const addContactUs = catchAsync(async (req, res) => {
	await Contactus.create(req.body)

	return res.status(201).json({
		message: 'Thank you for contactus. We will response you soon.',
	})
})

module.exports = {
	addContactUs,
}
