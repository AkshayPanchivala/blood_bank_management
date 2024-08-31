const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
			required: [true, 'User Id is required'],
		},
		bloodbankId: {
			type: mongoose.Schema.ObjectId,
			ref: 'bloodbank',
			required: [true, 'Bloodbank Id is required'],
		},
		bloodType: {
			type: String,
			enum: [
				'A_Positive',
				'A_Negative',
				'B_Positive',
				'B_Negative',
				'AB_Positive',
				'AB_Negative',
				'O_Positive',
				'O_Negative',
				'',
			],
		},
		status: {
			type: String,
			enum: ['Pending', 'Accepted', 'Rejected', 'Fulfilled'],
			default: 'Pending',
			required: [true, 'Status is required'],
		},
		whenToGive: {
			type: Date,
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
)

const bloodDonateSchema = mongoose.model('blooddonate', schema)

module.exports = bloodDonateSchema
