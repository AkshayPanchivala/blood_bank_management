const AppError = require('../Utils/appError')
const catchAsync = require('../Utils/catchAsync')
const crypto = require('crypto')
const { forgotPasswordEmail } = require('../Utils/emailContant')

const forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on POSTed email
	const user = await req.model.findOne({ email: req.body.email })
	if (!user) {
		return next(new AppError('There is no user with email address.', 404))
	}

	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken()
	await user.save({ validateBeforeSave: false })

	// 3) Send it to user's email
	try {
		await forgotPasswordEmail(resetToken, user.email)

		return res.status(200).json({
			message: 'Check your email inbox to reset password.',
		})
	} catch (err) {
		user.passwordResetToken = undefined
		user.passwordResetExpires = undefined
		await user.save({ validateBeforeSave: false })

		return next(
			new AppError(
				'There was an error sending the email. Try again later!'
			),
			500
		)
	}
})

const resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on the token
	const hashedToken = crypto
		.createHash(process.env.CREATEHASH_KEY)
		.update(req.params.token)
		.digest('hex')

	const user = await req.model.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	})

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400))
	}
	user.password = req.body.password
	user.passwordResetToken = undefined
	user.passwordResetExpires = undefined
	await user.save()

	// 3) Update changedPasswordAt property for the user
	// 4) Log the user in, send JWT
	// createSendToken(user, 200, res);
	return res.status(200).json({
		message: 'Password Reset Successfully.',
	})
})

module.exports = {
	forgotPassword,
	resetPassword,
}
