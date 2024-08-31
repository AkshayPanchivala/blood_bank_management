const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const userRoute = require('./User/userRoute')
const bloodbankRoute = require('./BloodBank/bloodbankRoute')
const adminRoute = require('./Admin/adminRoute')
const globleErrorhandler = require('./Utils/errorMiddlewares')
const stateRouter = require('./State/stateRoute')
const cityRouter = require('./City/cityRoute')
const donateRequestsRouter = require('./BloodDonate/bloodDonateRouter')
const receiveRequestsRouter = require('./BloodReceive/bloodReceiveRouter')
const bloodStock = require('./BloodStock/bloodStockRoute')
const contactusRoute = require('./ContactUs/contactUsRoute')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)
app.use('/api/bloodbank', bloodbankRoute)
app.use('/api/state', stateRouter)
app.use('/api/city', cityRouter)
app.use('/api/donaterequests', donateRequestsRouter)
app.use('/api/receiverequests', receiveRequestsRouter)
app.use('/api/bloodstock', bloodStock)
app.use('/api/contactus', contactusRoute)

app.use(globleErrorhandler)

module.exports = app
