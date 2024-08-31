import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	receiveRequests: [],
	allReceiveRequests: [],
}

export const getAllReceiveRequstsFromBloodbank = createAsyncThunk(
	'receiverequest/getAllReceiveRequstsFromBloodbank',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/receiverequests/getbloodbankdata`,
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

export const getAllReceiveRequstsFromUser = createAsyncThunk(
	'receiverequest/getAllReceiveRequstsFromUser',
	async (stage, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const query = stage !== 'All' && `status=${stage}`

			const response = await axios.get(
				`${BASE_URL}/receiverequests/getuserdata?${query && query}`,
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

export const getReceiveBloodbankDataQuery = createAsyncThunk(
	'receiverequest/getDonateBloodbankDataQuery',
	async (stage, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const query = stage !== 'All' && `status=${stage}`

			const response = await axios.get(
				`${BASE_URL}/receiverequests/getbloodbankdataquery?${
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

export const addReceiveRequest = createAsyncThunk(
	'receiverequest/addReceiveRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.post(
				`${BASE_URL}/receiverequests/addrequest`,
				{
					bloodbankId: data?.bloodbankId,
					bloodType: data?.bloodType,
					unit: data?.unit,
					whenDoYouWant: data?.whenDoYouWant,
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

export const acceptReceiveRequest = createAsyncThunk(
	'receiverequest/acceptReceiveRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/receiverequests/acceptrequest`,
				{ id: data?.id },
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

export const fulfilledReceiveRequest = createAsyncThunk(
	'receiverequest/fulfilledReceiveRequest',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/receiverequests/fulfilledrequest`,
				{
					id: data?.id,
					whenDoYouWant: data?.whenDoYouWant,
					bloodType: data?.bloodType,
					unit: 1,
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

export const rejectReceiveRequest = createAsyncThunk(
	'receiverequest/rejectReceiveRequest',
	async (id, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/receiverequests/rejectrequest`,
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

export const rejectReceiveRequestByUser = createAsyncThunk(
	'receiverequest/rejectReceiveRequestByUser',
	async (id, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/receiverequests/rejectrequestbyuser`,
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

export const editReceiveRequestByUser = createAsyncThunk(
	'receiverequest/editReceiveRequestByUser',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/receiverequests/editreceiverequest`,
				{
					id: data?.id,
					whenDoYouWant: data?.whenDoYouWant,
					bloodType: data?.bloodType,
					unit: data?.unit,
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

const receiverequestSlice = createSlice({
	name: 'receiverequest',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllReceiveRequstsFromBloodbank.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(
				getAllReceiveRequstsFromBloodbank.fulfilled,
				(state, action) => {
					return {
						...state,
						isLoading: false,
						allReceiveRequests: action?.payload,
					}
				}
			)
			.addCase(getAllReceiveRequstsFromBloodbank.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getAllReceiveRequstsFromUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(
				getAllReceiveRequstsFromUser.fulfilled,
				(state, action) => {
					return {
						...state,
						isLoading: false,
						allReceiveRequests: action?.payload,
					}
				}
			)
			.addCase(getAllReceiveRequstsFromUser.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getReceiveBloodbankDataQuery.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(
				getReceiveBloodbankDataQuery.fulfilled,
				(state, action) => {
					return {
						...state,
						isLoading: false,
						receiveRequests: action?.payload,
					}
				}
			)
			.addCase(getReceiveBloodbankDataQuery.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export default receiverequestSlice.reducer
