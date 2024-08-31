import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	stock: null,
}

export const getBloodStock = createAsyncThunk(
	'bloodstock/getBloodStock',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/bloodstock/getStock`,
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

export const updateStock = createAsyncThunk(
	'bloodstock/increaseStock',
	async (stock, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/bloodstock/updatestock`,
				stock,
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

const bloodStockSlice = createSlice({
	name: 'bloodstock',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getBloodStock.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodStock.fulfilled, (state, action) => {
				const data = {
					A_Positive: action?.payload?.A_Positive,
					A_Negative: action?.payload?.A_Negative,
					B_Positive: action?.payload?.B_Positive,
					B_Negative: action?.payload?.B_Negative,
					AB_Positive: action?.payload?.AB_Positive,
					AB_Negative: action?.payload?.AB_Negative,
					O_Positive: action?.payload?.O_Positive,
					O_Negative: action?.payload?.O_Negative,
				}
				return {
					...state,
					isLoading: false,
					stock: data,
				}
			})
			.addCase(getBloodStock.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export default bloodStockSlice.reducer
