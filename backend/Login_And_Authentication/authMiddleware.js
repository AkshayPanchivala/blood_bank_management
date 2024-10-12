const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../Utils/catchAsync')

const protect = catchAsync(async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return res.status(401).json({
			message: 'You are not logged in! Login to get access.',
		})
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

	const currentTime = Math.floor(Date.now() / 1000) // Convert to seconds
	if (currentTime > decoded.exp) {
		return res.status(401).json({
			message: 'Token Expired! Login to get access.',
		})
	}

	const currentUser = await req.model.findById(decoded.id).select('+password')
	if (!currentUser) {
		return res.status(401).json({
			message: 'The user belonging to this token does no longer exist.',
		})
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return res.status(401).json({
			message: 'User recently changed password! Please log in again.',
		})
	}

	req.user = currentUser

	next()
})

module.exports = {
	protect,
}
