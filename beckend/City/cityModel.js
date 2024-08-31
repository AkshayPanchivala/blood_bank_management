const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		stateName: {
			type: String,
			required: [true, 'State name is required'],
		},
		cityName: {
			type: String,
			unique: true,
			required: [true, 'City name is required'],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
)

const citySchema = mongoose.model('city', schema)

module.exports = citySchema
