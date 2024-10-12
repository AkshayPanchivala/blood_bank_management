const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		stateName: {
			type: String,
			unique: true,
			required: [true, 'State name is required'],
		},
	},
	{ timestamps: true }
)

const stateSchema = mongoose.model('state', schema)

module.exports = stateSchema
