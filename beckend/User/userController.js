const catchAsync = require('../Utils/catchAsync')
const { registerUserEmail } = require('../Utils/emailContant')

const registerUser = catchAsync(async (req, res) => {
	const user = await req.model.create(req.body)

	await registerUserEmail(user.firstName, user.lastName, user.email)

	return res.status(201).json({
		message: 'User Register Successfully.',
	})
})

const getUserById = catchAsync(async (req, res) => {
	const user = await req.model.findById(req.params.id)

	if (!user) {
		return res.status(200).json({
			message: 'User Not Found.',
		})
	}

	return res.status(200).json({
		message: 'User successfully retrieved.',
		user,
	})
})

const updateUser = catchAsync(async (req, res) => {
	const user = await req.model.findByIdAndUpdate(req.user._id, req.body, {
		new: true,
	})

	if (!user) {
		return res.status(200).json({
			message: 'User Not Found.',
		})
	}

	return res.status(200).json({
		message: 'User successfully updated.',
		user,
	})
})

const getUserProfile = catchAsync(async (req, res) => {
	const user = await req.model.findById(req.user._id)

	return res.status(200).json(user)
})

module.exports = {
	registerUser,
	getUserById,
	getUserProfile,
	updateUser,
}
