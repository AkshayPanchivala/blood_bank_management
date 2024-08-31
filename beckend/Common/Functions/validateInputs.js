const emailValidate = (email) => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
	if (!emailRegex.test(email)) return false

	return true
}

const passwordSpaceValidate = (password) => {
	const passwordArray = password.split('')
	let temp = true
	passwordArray.map((data) => {
		if (data === '') temp = false
	})
	if (!temp) return false
	return true
}

const passwordLengthValidate = (password) => {
	if (password.length < 8 || password.length > 20) return false

	return true
}

const passwordAndPasswordConfirmValidate = (password, confirmPassword) => {
	if (password !== confirmPassword) return false

	return true
}

const passwordValidate = (password) => {
	const passwordRegex = /^[a-zA-Z0-9._-]+$/
	if (!passwordRegex.test(password)) {
		return false
	}

	return true
}

const pincodeValidate = (pincode) => {
	if (pincode.toString().length !== 6) return false

	return true
}

const phoneNumberValidate = (phoneNo) => {
	if (phoneNo.toString().trim().length !== 10) return false

	return true
}

module.exports = {
	emailValidate,
	passwordLengthValidate,
	passwordAndPasswordConfirmValidate,
	pincodeValidate,
	phoneNumberValidate,
	passwordValidate,
	passwordSpaceValidate,
}
