import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {
	FormControlLabel,
	FormLabel,
	Paper,
	Radio,
	RadioGroup,
	Typography,
	createTheme,
} from '@mui/material'
import StateDropdown from '../UI/StateDropdown'
import CityDropdown from '../UI/CityDropdown'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../store/loginslice'
import { useNavigate } from 'react-router-dom'
import { updateUser, updateUserPassword } from '../../store/userSlice'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	background: 'transparent',
}))

const theme = createTheme()

theme.typography.h3 = {
	fontSize: '1.2rem',
	'@media (min-width:600px)': {
		fontSize: '1.5rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '2rem',
	},
}

const UserProfile = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [userData, setUserData] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const response = await dispatch(getUserProfile())
			if (
				response?.meta?.requestStatus === 'fulfilled' ||
				response?.meta?.requestStatus === 'rejected'
			)
				setIsLoading(false)
			setUserData(response.payload)
		}
		fetchData()
	}, [dispatch])

	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [passwordCurrent, setPasswordCurrent] = useState('')

	const setStateHandler = (state) => {
		setUserData({
			...userData,
			state,
		})
	}

	const setCityHandler = (city) => {
		setUserData({
			...userData,
			city,
		})
	}

	const updateDetailsHandler = async (event) => {
		event.preventDefault()
		const response = await dispatch(updateUser(userData))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success('Profile Update Successfully')
			navigate('/user')
		} else {
			toast.error('Profile Update Failed')
		}
	}

	const updatePasswordHandler = async (event) => {
		event.preventDefault()
		const body = {
			passwordCurrent,
			password,
			passwordConfirm,
		}
		const response = await dispatch(updateUserPassword(body))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success('Password Update Successfully')
			navigate('/user')
		} else {
			toast.error(response?.payload?.message)
		}
	}

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<Box sx={{ flexGrow: 1 }}>
						<Grid item xs={12} sm={12} md={12}>
							<Item>
								<CssBaseline />
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										background: '#f5f7fa',
									}}
								>
									<ThemeProvider theme={theme}>
										<Typography variant='h3'>
											Update Profile
										</Typography>
									</ThemeProvider>

									{!isLoading && (
										<Box
											component='form'
											onSubmit={updateDetailsHandler}
											sx={{ mt: 3 }}
										>
											<Grid container spacing={1}>
												<Grid item xs={12} sm={6}>
													<TextField
														autoFocus
														required
														fullWidth
														id='firstName'
														name='firstName'
														label='First Name'
														onChange={(e) =>
															setUserData({
																...userData,
																firstName:
																	e.target
																		.value,
															})
														}
														value={
															userData?.firstName
														}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id='lastName'
														name='lastName'
														label='Last Name'
														onChange={(e) =>
															setUserData({
																...userData,
																lastName:
																	e.target
																		.value,
															})
														}
														value={
															userData?.lastName
														}
													/>
												</Grid>
												<Grid item xs={12}>
													<FormLabel
														id='demo-controlled-radio-buttons-group'
														sx={{
															alignContent:
																'left',
														}}
													>
														Gender
													</FormLabel>
													<RadioGroup
														row
														aria-labelledby='demo-row-radio-buttons-group-label'
														name='row-radio-buttons-group'
														onChange={(e) =>
															setUserData({
																...userData,
																gender: e.target
																	.value,
															})
														}
														value={userData?.gender}
													>
														<FormControlLabel
															value='Male'
															control={<Radio />}
															label='Male'
														/>
														<FormControlLabel
															value='Female'
															control={<Radio />}
															label='Female'
														/>
													</RadioGroup>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														focused={false}
														id='dob'
														name='dob'
														label='Date of Birth'
														type='date'
														onChange={(e) =>
															setUserData({
																...userData,
																dob: e.target
																	.value,
															})
														}
														value={new Date(
															userData?.dob
														)
															?.toJSON()
															?.slice(0, 10)}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id='age'
														name='age'
														label='Age'
														type='number'
														onChange={(e) =>
															setUserData({
																...userData,
																age: e.target
																	.value,
															})
														}
														value={userData?.age}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id='phoneNo1'
														name='phoneNo1'
														label='Phone 1'
														type='number'
														onChange={(e) =>
															setUserData({
																...userData,
																phoneNo1:
																	e.target
																		.value,
															})
														}
														value={
															userData?.phoneNo1
														}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														id='phoneNo2'
														name='phoneNo2'
														label='Phone 2'
														type='number'
														onChange={(e) =>
															setUserData({
																...userData,
																phoneNo2:
																	e.target
																		.value,
															})
														}
														value={
															userData?.phoneNo2
														}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id='email'
														name='email'
														label='Email Address'
														autoComplete='email'
														onChange={(e) =>
															setUserData({
																...userData,
																email: e.target
																	.value,
															})
														}
														value={userData?.email}
													/>
												</Grid>

												<Grid item xs={6}>
													<TextField
														readOnly
														fullWidth
														id='state'
														name='state'
														label='State'
														value={userData?.state}
													/>
												</Grid>
												<Grid item xs={6}>
													<TextField
														readOnly
														fullWidth
														id='city'
														name='city'
														label='City'
														value={userData?.city}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<StateDropdown
														title='State'
														stateName={
															userData?.state
														}
														stateChangeHandler={
															setStateHandler
														}
													/>
												</Grid>

												<Grid item xs={12} sm={6}>
													<CityDropdown
														title='City'
														cityName={
															!isLoading
																? userData?.city
																: '0'
														}
														stateName={
															userData?.state
														}
														canCallApi={
															userData?.state
																? true
																: false
														}
														cityChangeHandler={
															setCityHandler
														}
													/>
												</Grid>

												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id='address'
														name='address'
														label='Address'
														onChange={(e) =>
															setUserData({
																...userData,
																address:
																	e.target
																		.value,
															})
														}
														value={
															userData?.address
														}
													/>
												</Grid>

												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id='pinCode'
														name='pinCode'
														label='Pin Code'
														type='number'
														onChange={(e) =>
															setUserData({
																...userData,
																pinCode:
																	e.target
																		.value,
															})
														}
														value={
															userData?.pinCode
														}
													/>
												</Grid>
											</Grid>
											<Button
												type='submit'
												fullWidth
												variant='contained'
												sx={{ mt: 3, mb: 2 }}
											>
												Update Profile
											</Button>
										</Box>
									)}
								</Box>
							</Item>
						</Grid>
					</Box>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Box sx={{ flexGrow: 1, background: '#f5f7fa' }}>
						<Grid item xs={12} sm={12} md={12}>
							<Item>
								<CssBaseline />
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<ThemeProvider theme={theme}>
										<Typography variant='h3'>
											Update Password
										</Typography>
									</ThemeProvider>

									<Box
										component='form'
										onSubmit={updatePasswordHandler}
										sx={{ mt: 3 }}
									>
										<Grid container spacing={1}>
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													name='passwordCurrent'
													label='Password Current'
													type='password'
													id='passwordCurrent'
													onChange={(e) =>
														setPasswordCurrent(
															e.target.value
														)
													}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													name='password'
													label='Password'
													type='password'
													id='password'
													onChange={(e) =>
														setPassword(
															e.target.value
														)
													}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													required
													fullWidth
													name='passwordConfirm'
													label='Password Confirm'
													type='password'
													id='passwordConfirm'
													onChange={(e) =>
														setPasswordConfirm(
															e.target.value
														)
													}
												/>
											</Grid>
										</Grid>
										<Button
											type='submit'
											fullWidth
											variant='contained'
											sx={{ mt: 3, mb: 2 }}
										>
											Update Password
										</Button>
									</Box>
								</Box>
							</Item>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export default UserProfile
