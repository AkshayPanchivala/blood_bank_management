import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASEURL

const initialState = {
	isLoading: false,
	contactus: [],
}

export const addContactus = createAsyncThunk(
	'contactus/addContactus',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/contactus/addcontactus`,
				data
			)
			return response?.data
		} catch (error) {
			return rejectWithValue(error?.response?.data)
		}
	}
)

const contactusSlice = createSlice({
	name: 'contactus',
	initialState,
	reducers: {},
	extraReducers(builder) {},
})

export default contactusSlice.reducer
