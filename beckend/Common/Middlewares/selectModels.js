const userModel = require('../../User/userModel')
const BloodbankModel = require('../../BloodBank/bloodbankModel')
const AdminModel = require('../../Admin/adminModel')

const selectUserModel = (req, res, next) => {
	req.model = userModel

	next()
}

const selectBloodbankModel = (req, res, next) => {
	req.model = BloodbankModel

	next()
}

const selectAdminModel = (req, res, next) => {
	req.model = AdminModel

	next()
}

module.exports = {
	selectUserModel,
	selectBloodbankModel,
	selectAdminModel,
}
