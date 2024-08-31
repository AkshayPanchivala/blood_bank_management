import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
}

export const forgotPassword = createAsyncThunk(
	'passwordAuth/forgotPassword',
	async (email, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/user/forgotpassword`,
				{ email }
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const resetPassword = createAsyncThunk(
	'passwordAuth/resetPassword',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.patch(
				`${BASE_URL}/user/resetpassword/${data?.token}`,
				{
					password: data?.password,
					passwordConfirm: data?.passwordConfirm,
				}
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const passwordSlice = createSlice({
	name: 'passwordAuth',
	initialState,
	reducers: {},
})

export default passwordSlice.reducer
