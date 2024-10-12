const express = require('express')
const { addContactUs } = require('./contactUsController')
const router = express.Router()

router.route('/addcontactus').post(addContactUs)

module.exports = router
