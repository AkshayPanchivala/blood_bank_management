const catchAsync = require('../Utils/catchAsync')
const Bloodstock = require('./bloodStockModel')

const addStock = catchAsync(async (id) => {
	await Bloodstock.create({ bloodbankId: id })
})

const getStock = catchAsync(async (req, res) => {
	const bloodStock = await Bloodstock.findOne({ bloodbankId: req.user._id })

	return res.status(200).json(bloodStock)
})

const checkAvailability = async (bloodbankId, bloodType, unit) => {
	const bloodstock = await Bloodstock.findOne({ bloodbankId })

	for (const key in bloodstock) {
		if (key === bloodType) {
			if (bloodstock[key] < unit) {
				return false
			}
		}
	}

	return true
}

const updatStock = catchAsync(async (req, res) => {
	const currentStock = await Bloodstock.findOne({
		bloodbankId: req.user._id,
	})

	const body = req.body

	for (const key in currentStock) {
		if (Object.keys(body).includes(key)) {
			if (currentStock[key] + Number(body[key]) >= 0) {
				currentStock[key] = currentStock[key] + Number(body[key])
			} else {
				return res.status(404).json({
					message: 'You can not decrease stock more than you have.',
				})
			}
		}
	}

	await currentStock.save()

	return res.status(200).json({
		message: 'Stock Updated.',
	})
})

const increaseStock = async (bloodbankId, bloodType) => {
	const currentStock = await Bloodstock.findOne({
		bloodbankId,
	})

	for (const key in currentStock) {
		if (bloodType === key) {
			currentStock[key] = currentStock[key] + 1
		}
	}

	await currentStock.save()
}

const decreaseStock = async (bloodbankId, bloodType, unit) => {
	const bloodstock = await Bloodstock.findOne({ bloodbankId })

	for (const key in bloodstock) {
		if (key === bloodType) {
			bloodstock[key] = bloodstock[key] - unit
		}
	}

	await bloodstock.save()
}

module.exports = {
	addStock,
	getStock,
	updatStock,
	checkAvailability,
	increaseStock,
	decreaseStock,
}
