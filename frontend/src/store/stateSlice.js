import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	states: [],
	cities: [],
}

export const getStates = createAsyncThunk(
	'states/getStates',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/state`)
			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const getCities = createAsyncThunk(
	'states/getCities',
	async (stateName, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/city/getcitybystatename/${stateName}`
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const stateSlice = createSlice({
	name: 'states',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getStates.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getStates.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					states: action?.payload,
				}
			})
			.addCase(getStates.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(getCities.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getCities.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					cities: action?.payload,
				}
			})
			.addCase(getCities.rejected, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
	},
})

export const stateActions = stateSlice.actions

export default stateSlice.reducer
