const AppError = require('../Utils/appError')

const cityMiddleware = (req, res, next) => {
	const missingValue = []

	if (!req.body.stateName) missingValue.push('State Name')
	if (!req.body.cityName) missingValue.push('City Name')

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
	cityMiddleware,
}
