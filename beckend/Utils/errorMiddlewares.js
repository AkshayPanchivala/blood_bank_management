const AppError = require('./appError')

// Cast Error
const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`
	return new AppError(message, 400)
}

// Duplicate Field Error
const handleDuplicateFieldsDB = (err) => {
	const message = `${Object.keys(err.keyValue).join()} : ${Object.values(
		err.keyValue
	).join()} is already taken. Use another value!`
	return new AppError(message, 400)
}

// Validation Error
const handleValidationErrorDB = (error) => {
	const errors = Object.values(error.errors).map((err) => err.message)
	const message = `Invalid input data. ${errors.join('. ')}`
	return new AppError(message, 400)
}

// Invalid Token
const handleJWTError = () => new AppError('Invalid token. Log in again!', 401)

// Token Expire Error
const handleJWTExpiredError = () =>
	new AppError('Your token has expired! Log in again.', 401)

// Send Error To front-End
const sendError = (err, req, res, next) => {
	if (req.originalUrl.startsWith('/api')) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				message: err.message,
			})
		}

		// B) Programming or other unknown error: don't leak error details
		return res.status(500).json({
			message: 'Something went very wrong! Try again later.',
		})
	}

	return res.status(err.statusCode).json({
		title: 'Something went wrong!',
		message: 'Try again later.',
	})
}

module.exports = (err, req, res, next) => {
	console.log('error', err)

	err.statusCode = err.statusCode || 500

	let error = { ...err }
	error.message = err.message

	if (error.name === 'CastError') error = handleCastErrorDB(error)
	if (error.code === 11000) error = handleDuplicateFieldsDB(error)
	if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
	if (error.name === 'JsonWebTokenError') error = handleJWTError()
	if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

	sendError(error, req, res, next)
}
