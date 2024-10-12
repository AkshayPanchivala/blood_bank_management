const catchAsync = require('../Utils/catchAsync')

const adminRegister = catchAsync(async (req, res) => {
	await req.model.create(req.body)

	return res.status(201).json({
		message: 'Admin Register Successfully.',
	})
})

module.exports = {
	adminRegister,
}
