const AppError = require('../Utils/appError')
const {
	emailValidate,
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
	pincodeValidate,
} = require('../Common/Functions/validateInputs')

const registerMiddleware = (req, res, next) => {
	const missingValues = []
	if (!req.body.firstName) missingValues.push('FirstName')
	if (!req.body.lastName) missingValues.push('LastName')
	if (!req.body.gender) missingValues.push('Gender')
	if (!req.body.dob) missingValues.push('Date of Birth')
	if (!req.body.age) missingValues.push('Age')
	if (!req.body.phoneNo1) missingValues.push('Primary Phone number')
	if (!req.body.email) missingValues.push('Email address')
	if (!req.body.state) missingValues.push('State name')
	if (!req.body.city) missingValues.push('City name')
	if (!req.body.address) missingValues.push('Address')
	if (!req.body.pinCode) missingValues.push('Pin code')
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

	if (!emailValidate(req.body.email)) {
		return next(new AppError('Invalid email address.', 400))
	}

	if (!pincodeValidate(req.body.pinCode)) {
		return next(new AppError('Invalid Pin Code.', 400))
	}

	if (req.body.age <= 18 || req.body.age >= 65) {
		return next(new AppError('Age should be between 16 and 65.', 400))
	}

	next()
}

module.exports = {
	registerMiddleware,
}
