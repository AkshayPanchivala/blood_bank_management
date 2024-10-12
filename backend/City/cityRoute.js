const express = require('express')
const router = express.Router()
const { addCity, getCities } = require('./cityController')
const { cityMiddleware } = require('./cityMiddleware')

router.route('/addcity').post(cityMiddleware, addCity)

router.route('/getcitybystatename/:stateName').get(getCities)

module.exports = router
