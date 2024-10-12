const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')

const schema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First Name is required'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is required'],
			trim: true,
		},
		gender: {
			type: String,
			enum: ['Male', 'Female'],
			required: [true, 'Gender is required'],
			trim: true,
		},
		dob: {
			type: Date,
			required: [true, 'Date of birth is required'],
		},
		age: {
			type: Number,
			required: [true, 'Age is required'],
			min: 18,
			max: 65,
		},
		phoneNo1: {
			type: Number,
			required: [true, 'Primary Phone number is required'],
			unique: true,
		},
		phoneNo2: {
			type: Number,
		},
		email: {
			type: String,
			required: [true, 'Email address is required'],
			unique: true,
			trim: true,
		},
		state: {
			type: String,
			required: [true, 'State is required'],
			trim: true,
		},
		city: {
			type: String,
			required: [true, 'City is required'],
			trim: true,
		},
		address: {
			type: String,
			required: [true, 'Address is required'],
			trim: true,
		},
		pinCode: {
			type: Number,
			required: [true, 'PIN Code is required'],
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

const userSchema = mongoose.model('user', schema)

module.exports = userSchema
