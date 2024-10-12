const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const contactUsSchema = mongoose.model('contactus', schema, 'contactus')

module.exports = contactUsSchema
