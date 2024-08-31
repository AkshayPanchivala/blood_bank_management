import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	bloodbanks: [],
	bloodbank: [],
}

export const registerBloodbank = createAsyncThunk(
	'bloodbank/registerBloodbank',
	async (bloodbank, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.post(
				`${BASE_URL}/bloodbank/register`,
				bloodbank,
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

export const getBloodbanks = createAsyncThunk(
	'bloodbank/getBloodbanks',
	async (query, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/bloodbank/getbloodbanksbyquery?${query}`
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const getBloodbankbyId = createAsyncThunk(
	'bloodbank/getBloodbankbyId',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/bloodbank/getbloodbankbyid/${id}`
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const bloodbankSlice = createSlice({
	name: 'bloodbank',
	initialState,
	reducers: {
		clearBloodbankData: (state) => {
			return {
				...state,
				isLoading: false,
				bloodbanks: [],
				bloodbank: [],
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getBloodbanks.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodbanks.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					bloodbanks: action?.payload,
				}
			})
			.addCase(getBloodbanks.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getBloodbankbyId.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodbankbyId.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					bloodbanks: action?.payload,
				}
			})
			.addCase(getBloodbankbyId.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export const { clearBloodbankData } = bloodbankSlice.actions

export default bloodbankSlice.reducer
