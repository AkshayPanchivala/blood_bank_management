import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	error: null,
}

export const registerUser = createAsyncThunk(
	'user/signupUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASE_URL}/user/register`, user)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/user/updateuser`,
				user,
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

export const updateUserPassword = createAsyncThunk(
	'user/updateUserPassword',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.patch(
				`${BASE_URL}/user/updatepassword`,
				user,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(registerUser.fulfilled, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				toast.error(action?.payload?.message)
				return {
					...state,
					isLoading: false,
					error: action?.payload,
				}
			})
			.addCase(updateUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				return {
					...state,
					user: action?.payload,
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
			.addCase(updateUserPassword.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(updateUserPassword.fulfilled, (state, action) => {
				return {
					...state,
					user: action?.payload?.user,
					token: action?.payload?.token,
				}
			})
			.addCase(updateUserPassword.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
	},
})

export const userActions = userSlice.actions

export default userSlice.reducer
