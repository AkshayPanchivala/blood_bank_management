import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const loginData = JSON.parse(localStorage.getItem('loginData'))

const initialState = loginData
	? loginData
	: {
			isLoggedin: false,
			isLoading: false,
			token: '',
			user: {},
			role: '',
			error: undefined,
	  }

export const loginUser = createAsyncThunk(
	'login/loginUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(BASE_URL + '/user/login', user)

			const LoggedInUserData = {
				isLoggedin: true,
				token: response?.data.token,
				isLoading: false,
				role: 'USER',
				error: null,
			}
			localStorage.setItem('loginData', JSON.stringify(LoggedInUserData))

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const getUserProfile = createAsyncThunk(
	'login/getUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/user/getuserprofile`,
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

export const loginBloodbank = createAsyncThunk(
	'login/loginBloodbank',
	async (bloodbank, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/bloodbank/login`,
				bloodbank
			)
			const LoggedInUserData = {
				isLoggedin: true,
				token: response?.data.token,
				isLoading: false,
				role: 'BLOODBANK',
				error: null,
			}
			localStorage.setItem('loginData', JSON.stringify(LoggedInUserData))

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

export const getBloodbankProfile = createAsyncThunk(
	'login/getBloodbankProfile',
	async (_, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('loginData'))
			const token = userData?.token

			const response = await axios.get(
				`${BASE_URL}/bloodbank/getbloodbankprofile`,
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

export const loginAdmin = createAsyncThunk(
	'login/loginAdmin',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASE_URL}/admin/login`, user)

			const LoggedInUserData = {
				isLoggedin: true,
				token: response?.data.token,
				user: response?.data.user,
				isLoading: false,
				role: 'ADMIN',
				error: null,
			}
			localStorage.setItem('loginData', JSON.stringify(LoggedInUserData))

			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('loginData')
			return {
				...state,
				isLoggedin: false,
				isLoading: false,
				token: null,
				user: {},
				role: '',
				error: undefined,
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					token: action?.payload?.token,
					user: action?.payload?.user,
					role: 'USER',
					error: null,
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
			.addCase(getUserProfile.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				return {
					...state,
					user: action?.payload,
					isLoading: false,
				}
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
			.addCase(loginBloodbank.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(loginBloodbank.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					token: action?.payload?.token,
					user: action?.payload?.user,
					role: 'BLOODBANK',
					error: null,
				}
			})
			.addCase(loginBloodbank.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
			.addCase(getBloodbankProfile.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(getBloodbankProfile.fulfilled, (state, action) => {
				return {
					...state,
					user: action?.payload,
					isLoading: false,
				}
			})
			.addCase(getBloodbankProfile.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
			.addCase(loginAdmin.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(loginAdmin.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					token: action?.payload?.token,
					user: action?.payload?.user,
					role: 'ADMIN',
					error: null,
				}
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action?.payload?.message,
				}
			})
	},
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer
