const AppError = require('../Utils/appError')
const {
	emailValidate,
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
	phoneNumberValidate,
	passwordValidate,
	passwordSpaceValidate,
} = require('../Common/Functions/validateInputs')

const registerMiddleware = (req, res, next) => {
	const missingValues = []

	if (!req.body.phoneNo) missingValues.push('Primary Phone number')
	if (!req.body.email) missingValues.push('Email address')
	if (!req.body.password) missingValues.push('Password')
	if (!req.body.passwordConfirm) missingValues.push('Password Confirm')

	if (missingValues.length > 0)
		return next(
			new AppError(
				`Required missing values : ${missingValues.join(', ')}`,
				400
			)
		)

	if (!passwordSpaceValidate(req.body.password)) {
		return next(new AppError('Password can not contain spaces', 400))
	}

	if (!passwordValidate(req.body.password)) {
		return next(new AppError('Password Too weak', 400))
	}

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

	if (!emailValidate(req.body.email)) {
		return next(new AppError('Invalid email address.', 400))
	}

	if (!phoneNumberValidate(req.body.phoneNo)) {
		return next(new AppError('Invalid phone number.', 400))
	}

	next()
}

module.exports = {
	registerMiddleware,
}
