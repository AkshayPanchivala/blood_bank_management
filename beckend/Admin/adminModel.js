const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const schema = new mongoose.Schema(
	{
		phoneNo: {
			type: String,
			required: [true, 'Primary Phone number is required'],
			unique: true,
			min: 10,
			max: 10,
		},
		email: {
			type: String,
			required: [true, 'Email address is required'],
			lowercase: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			select: false,
			trim: true,
			min: 8,
			max: 20,
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

const adminSchema = mongoose.model('admin', schema, 'admin')

module.exports = adminSchema
