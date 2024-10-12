const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	A_Positive: {
		type: Number,
		default: 0,
	},
	A_Negative: {
		type: Number,
		default: 0,
	},
	B_Positive: {
		type: Number,
		default: 0,
	},
	B_Negative: {
		type: Number,
		default: 0,
	},
	AB_Positive: {
		type: Number,
		default: 0,
	},
	AB_Negative: {
		type: Number,
		default: 0,
	},
	O_Positive: {
		type: Number,
		default: 0,
	},
	O_Negative: {
		type: Number,
		default: 0,
	},
	bloodbankId: {
		type: mongoose.Types.ObjectId,
		ref: 'bloodbank',
		required: true,
		unique: true,
	},
})

const BloodStockSchema = mongoose.model('bloodstock', schema)

module.exports = BloodStockSchema
