const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema(
	{
		state: {
			type: String,
			required: [true, 'State name is required'],
			trim: true,
		},
		city: {
			type: String,
			required: [true, 'City name is required'],
			trim: true,
		},
		bloodbankName: {
			type: String,
			required: [true, 'Blood Bank Name is required'],
			trim: true,
		},
		category: {
			type: String,
			enum: ['Government', 'RedCross', 'Private'],
			required: [true, 'Category is required'],
			trim: true,
		},
		contactPerson: {
			type: String,
			required: [true, 'Contact Person Name is required'],
			trim: true,
		},
		address1: {
			type: String,
			required: [true, 'Blood Bank Address 2 is required'],
			trim: true,
		},
		address2: {
			type: String,
			required: [true, 'Blood Bank Address 2 is required'],
			trim: true,
		},
		pinCode: {
			type: Number,
			required: [true, 'Blood Bank Pin code is required'],
			trim: true,
		},
		phoneNo1: {
			type: String,
			required: [true, 'Blood Bank primary Phone number is required'],
			unique: true,
		},
		phoneNo2: {
			type: String,
			required: [true, 'Blood Bank alternate Phone number is required'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Blood Bank Email is required'],
			unique: true,
			trim: true,
		},
		openingDate: {
			type: Date,
			default: Date.now(),
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false,
			trim: true,
			min: 8,
			max: 20,
		},
		status: {
			type: Boolean,
			default: true,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{ timestamps: true }
)

schema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	this.password = await bcryptjs.hash(
		this.password,
		Number(process.env.PASSWORD_ENCRYPT_LEVEL)
	)

	next()
})

schema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcryptjs.compare(candidatePassword, userPassword)
}

schema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		)
		return JWTTimestamp < changedTimestamp
	}

	return false
}

schema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto
		.createHash(process.env.CREATEHASH_KEY)
		.update(resetToken)
		.digest('hex')

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000

	return resetToken
}

const bloodbankSchema = mongoose.model('bloodbank', schema)

module.exports = bloodbankSchema
