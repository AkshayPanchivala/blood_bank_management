const AppError = require('../Utils/appError')

const stateMiddleware = (req, res, next) => {
	const missingValue = []

	if (!req.body.stateName) missingValue.push('State Name')

	if (missingValue.length > 0)
		return next(
			new AppError(
				`Requird missing values : ${missingValue.join(', ')}`,
				400
			)
		)

	next()
}

module.exports = {
	stateMiddleware,
}
