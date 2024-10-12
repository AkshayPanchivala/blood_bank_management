const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const jwt = require('jsonwebtoken')
const {
	emailValidate,
	passwordLengthValidate,
} = require('../Common/Functions/validateInputs')

const tokenGenerate = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

const loginMiddleware = (req, res, next) => {
	const missingValues = []

	if (!req.body.email) missingValues.push('Email')
	if (!req.body.password) missingValues.push('Password')

	if (missingValues.length > 0)
		return next(
			new AppError(
				`Required missing values : ${missingValues.join(', ')}`,
				400
			)
		)

	if (!emailValidate(req.body.email)) {
		return next(new AppError('Invalid email address.', 400))
	}

	if (!passwordLengthValidate(req.body.password)) {
		return next(
			new AppError('Password should be at least 8 to 20 characters.', 400)
		)
	}

	next()
}

const login = catchAsync(async (req, res) => {
	const { email, password } = req.body

	const user = await req.model.findOne({ email }).select('+password')
	if (
		user === null ||
		!(await user.correctPassword(password, user.password))
	) {
		return res.status(401).json({
			message:
				'Email or Password incorrect. Check your Login credentials.',
		})
	}
	user.password = undefined

	const token = tokenGenerate(user._id)

	return res.status(200).json({
		message: 'Login Successfully.',
		token,
	})
})

module.exports = {
	tokenGenerate,
	loginMiddleware,
	login,
}
