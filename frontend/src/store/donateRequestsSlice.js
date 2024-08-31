import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	donateRequests: null,
	allDonateRequests: [],
}

export const getAllDonateRequstsFromBloodbank = createAsyncThunk(
	'donaterequest/getAllDonateRequstsFromBloodbank',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/donaterequests/getbloodbankdata`,
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

export const getAllDonateRequstsFromuser = createAsyncThunk(
	'donaterequest/getAllDonateRequstsFromuser',
	async (stage, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const query = stage !== 'All' && `status=${stage}`

			const response = await axios.get(
				`${BASE_URL}/donaterequests/getuserdata?${query && query}`,
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

export const getDonateBloodbankDataQuery = createAsyncThunk(
	'donaterequest/getDonateBloodbankDataQuery',
	async (stage, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const query = stage !== 'All' && `status=${stage}`

			const response = await axios.get(
				`${BASE_URL}/donaterequests/getbloodbankdataquery?${
					query && query
				}`,
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

export const addDonateRequest = createAsyncThunk(
	'donaterequest/addDonateRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.post(
				`${BASE_URL}/donaterequests/addrequest`,
				{
					bloodbankId: data?.bloodbankId,
					bloodType: data?.bloodType,
					whenToGive: data?.whenToGive,
				},
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

export const acceptDonateRequest = createAsyncThunk(
	'donaterequest/pendingDonateRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/donaterequests/acceptrequest`,
				{ id: data?.id, whenToGive: data?.whenToGive },
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

export const fulfilledDonateRequest = createAsyncThunk(
	'donaterequest/fulfilledDonateRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/donaterequests/fulfilledrequest`,
				{
					id: data?.id,
					whenToGive: data?.whenToGive,
					bloodType: data?.bloodType,
				},
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

export const rejectDonateRequest = createAsyncThunk(
	'donaterequest/rejectDonateRequest',
	async (id, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/donaterequests/rejectrequest`,
				{
					id,
				},
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

export const rejectDonateRequestByUser = createAsyncThunk(
	'donaterequest/rejectDonateRequestByUser',
	async (id, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/donaterequests/rejectrequestbyuser`,
				{
					id,
				},
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

export const editDonateRequestByUser = createAsyncThunk(
	'donaterequest/editDonateRequestByUser',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/donaterequests/editdonaterequest`,
				{
					id: data?.id,
					whenToGive: data?.whenToGive,
					bloodType: data?.bloodType,
				},
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

const donateRequestsSlice = createSlice({
	name: 'donaterequest',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllDonateRequstsFromBloodbank.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(
				getAllDonateRequstsFromBloodbank.fulfilled,
				(state, action) => {
					return {
						...state,
						isLoading: false,
						allDonateRequests: action?.payload,
					}
				}
			)
			.addCase(getAllDonateRequstsFromBloodbank.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getAllDonateRequstsFromuser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getAllDonateRequstsFromuser.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					allDonateRequests: action?.payload,
				}
			})
			.addCase(getAllDonateRequstsFromuser.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getDonateBloodbankDataQuery.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getDonateBloodbankDataQuery.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					donateRequests: action?.payload,
				}
			})
			.addCase(getDonateBloodbankDataQuery.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export default donateRequestsSlice.reducer
