const express = require('express')
const router = express.Router()
const { addState, getStates } = require('./stateController')
const { stateMiddleware } = require('./stateMiddleware')

router.route('/').post(stateMiddleware, addState).get(getStates)

module.exports = router
