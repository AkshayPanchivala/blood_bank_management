import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import loginslice from './loginslice'
import stateSlice from './stateSlice'
import bloodbankSlice from './bloodbankSlice'
import donateRequestsSlice from './donateRequestsSlice'
import receiverequestSlice from './receiverequestSlice'
import donateStatesSlice from './donateStatesSlice'
import receiveStatesSlice from './receiveStatesSlice'
import bloodStockSlice from './stockSlice'
import contactUsSlice from './contactUsSlice'

const store = configureStore({
	reducer: {
		login: loginslice,
		user: userSlice,
		states: stateSlice,
		bloodbanks: bloodbankSlice,
		donaterequests: donateRequestsSlice,
		receiverequests: receiverequestSlice,
		donatestates: donateStatesSlice,
		receivestates: receiveStatesSlice,
		stock: bloodStockSlice,
		contactus: contactUsSlice,
	},
})

export default store
