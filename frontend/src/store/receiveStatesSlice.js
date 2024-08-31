import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	Pending: '',
	Accepted: '',
	Rejected: '',
	Fulfilled: '',
}

export const getUserRequestsStates = createAsyncThunk(
	'receiveStates/getUserRequestsStates',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/receiverequests/getuserstates`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const getBloodbankReceiveStates = createAsyncThunk(
	'receiveStates/getBloodbankReceiveStates',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/receiverequests/getbloodbankstates`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const receiveStatesSlice = createSlice({
	name: 'receiveStates',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUserRequestsStates.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getUserRequestsStates.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					Pending: action?.payload[0]?.Pending,
					Accepted: action?.payload[0]?.Accepted,
					Rejected: action?.payload[0]?.Rejected,
					Fulfilled: action?.payload[0]?.Fulfilled,
				}
			})
			.addCase(getUserRequestsStates.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getBloodbankReceiveStates.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodbankReceiveStates.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					Pending: action?.payload[0]?.Pending,
					Accepted: action?.payload[0]?.Accepted,
					Rejected: action?.payload[0]?.Rejected,
					Fulfilled: action?.payload[0]?.Fulfilled,
				}
			})
			.addCase(getBloodbankReceiveStates.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export default receiveStatesSlice.reducer
