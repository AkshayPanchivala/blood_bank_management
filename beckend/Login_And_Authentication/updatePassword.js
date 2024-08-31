const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const {
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
} = require('../Common/Functions/validateInputs')

const updatePasswordMiddleware = (req, res, next) => {
	const missingValues = []

	if (!req.body.passwordCurrent) missingValues.push('Current Password')
	if (!req.body.password) missingValues.push('Password')
	if (!req.body.passwordConfirm) missingValues.push('Password Confirm')

	if (missingValues.length > 0)
		return next(
			new AppError(
				`Required missing values : ${missingValues.join(', ')}`,
				400
			)
		)
	if (!passwordLengthValidate(req.body.password)) {
		return next(
			new AppError('Password should be at least 8 to 20 characters.', 400)
		)
	}
	if (
		!passwordAndPasswordConfirmValidate(
			req.body.password,
			req.body.passwordConfirm
		)
	) {
		return next(
			new AppError('Password and Password Confirm are not match.', 400)
		)
	}

	next()
}

const updatePassword = catchAsync(async (req, res) => {
	const { passwordCurrent, password } = req.body

	if (!(await req.user.correctPassword(passwordCurrent, req.user.password))) {
		return res.status(401).json({
			message: 'Current password is incorrect',
		})
	}

	req.user.password = password
	await req.user.save()

	return res.status(200).json({
		message: 'Password Change SuccessFully',
	})
})

module.exports = {
	updatePasswordMiddleware,
	updatePassword,
}
