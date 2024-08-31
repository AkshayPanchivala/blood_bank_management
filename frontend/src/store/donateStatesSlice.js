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

export const getUserDonateStates = createAsyncThunk(
	'donateStates/getUserDonateStates',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/donaterequests/getuserstates`,
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

export const getBloodbankDonateStates = createAsyncThunk(
	'donateStates/getBloodbankDonateStates',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/donaterequests/getbloodbankstates`,
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

const donateStatesSlice = createSlice({
	name: 'donateStates',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUserDonateStates.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getUserDonateStates.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					Pending: action?.payload[0]?.Pending,
					Accepted: action?.payload[0]?.Accepted,
					Rejected: action?.payload[0]?.Rejected,
					Fulfilled: action?.payload[0]?.Fulfilled,
				}
			})
			.addCase(getUserDonateStates.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getBloodbankDonateStates.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodbankDonateStates.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					Pending: action?.payload[0]?.Pending,
					Accepted: action?.payload[0]?.Accepted,
					Rejected: action?.payload[0]?.Rejected,
					Fulfilled: action?.payload[0]?.Fulfilled,
				}
			})
			.addCase(getBloodbankDonateStates.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export default donateStatesSlice.reducer
