const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const {
	emailValidate,
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
	pincodeValidate,
} = require('../Common/Functions/validateInputs')

const registerMiddleware = catchAsync(async (req, res, next) => {
	const missingValues = []
	if (!req.body.state) missingValues.push('State name')
	if (!req.body.city) missingValues.push('City name')
	if (!req.body.bloodbankName) missingValues.push('Blood Bank name')
	if (!req.body.category) missingValues.push('category')
	if (!req.body.contactPerson) missingValues.push('Contact Person')
	if (!req.body.address1) missingValues.push('Blood Bank Address 1')
	if (!req.body.address2) missingValues.push('Blood Bank Address 2')
	if (!req.body.pinCode) missingValues.push('Pin code')
	if (!req.body.phoneNo1)
		missingValues.push('Blood Bank Primary Phone number')
	if (!req.body.phoneNo2)
		missingValues.push('Blood Bank Alternate Phone number')
	if (!req.body.email) missingValues.push(' Blood Bank Email address')
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

	const givenDate = new Date(req.body.openingDate)
	const currentDate = new Date()

	if (givenDate >= currentDate) {
		return next(new AppError('Opening Date should be in past.', 400))
	}

	next()
})

module.exports = {
	registerMiddleware,
}
