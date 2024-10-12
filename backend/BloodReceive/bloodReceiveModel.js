const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
			required: [true, 'User id is required'],
		},
		bloodbankId: {
			type: mongoose.Types.ObjectId,
			ref: 'bloodbank',
			reauired: [true, 'Bloodbank Id is required'],
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
			],
			required: [true, 'Bloodtype Id is required'],
		},
		unit: {
			type: Number,
			required: [true, 'How many blood Unit you want'],
			default: 1,
		},
		status: {
			type: String,
			enum: ['Pending', 'Accepted', 'Rejected', 'Fulfilled'],
			default: 'Pending',
			required: [true, 'Status is required'],
		},
		whenDoYouWant: {
			type: Date,
			required: [true, 'When do you want to receive blood?'],
		},
		message: {
			type: String,
		},
	},
	{ timestamps: true }
)

const bloodReceiveRequests = mongoose.model('bloodreceiverequests', schema)

module.exports = bloodReceiveRequests
