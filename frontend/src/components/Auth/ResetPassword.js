import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../store/passwordSlice'

const theme = createTheme()

const ResetPassword = () => {
	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()
	const [auth, setAuth] = useState({
		password: '',
		passwordConfirm: '',
	})
	const [errors, setErrors] = useState({
		passwordError: '',
		passwordConfirmError: '',
	})

	const inputChangeHandler = (event) => {
		const { name, value } = event?.target

		if (name === 'password') {
			setErrors((errors) => {
				return { ...errors, passwordError: '' }
			})
		}
		if (name === 'passwordConfirm') {
			setErrors((errors) => {
				return { ...errors, passwordConfirmError: '' }
			})
		}

		setAuth((auth) => {
			return { ...auth, [name]: value }
		})
	}

	const validateInputs = () => {
		let err = 0

		if (auth?.password?.length < 8 || auth?.password?.length > 20) {
			setErrors((errors) => {
				return {
					...errors,
					passwordError:
						'Password must be between 8 and 20 characters',
				}
			})
			err++
		}
		if (
			auth?.password !== auth?.passwordConfirm ||
			auth?.passwordConfirm === ''
		) {
			setErrors((errors) => {
				return {
					...errors,
					passwordConfirmError:
						'Password and passwordConfirm is not match do not match',
				}
			})
			err++
		}

		if (err !== 0) return false
		return true
	}

	const forgotPasswordHandler = async (event) => {
		event.preventDefault()

		const error = validateInputs()

		if (error) {
			if (params.role === 'user') {
				const response = await dispatch(
					resetPassword({
						token: params?.token,
						password: auth?.password,
						passwordConfirm: auth?.passwordConfirm,
					})
				)
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success(response?.payload?.message)
					navigate('/login/user')
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			}
		}

		// if (password?.length === 0) {
		// 	toast.error('Please enter your password')
		// 	return
		// }
		// if (passwordConfirm?.length === 0) {
		// 	toast.error('Please enter your password confirm')
		// 	return
		// }
		// if (auth?.password?.length < 8 || auth?.password?.length > 20) {
		// 	toast.error('Password must be between 8 and 20 characters')
		// 	return
		// }
		// if (passwordConfirm?.length < 8 || passwordConfirm?.length > 20) {
		// 	toast.error('Password confirm must be between 8 and 20 characters')
		// 	return
		// }
		// if (auth?.password !== auth?.passwordConfirm) {
		// 	toast.error(
		// 		'Password and passwordConfirm is not match do not match'
		// 	)
		// 	return
		// }

		// if (params.role === 'user') {
		// 	const response = await dispatch(
		// 		resetPassword({
		// 			token: params?.token,
		// 			password: auth?.password,
		// 			passwordConfirm: auth?.passwordConfirm,
		// 		})
		// 	)
		// 	if (response?.meta?.requestStatus === 'fulfilled') {
		// 		toast.success(response?.payload?.message)
		// 		navigate('/login/user')
		// 	} else if (response?.meta?.requestStatus === 'rejected') {
		// 		toast.error(response?.payload?.message)
		// 	} else {
		// 		toast.error('Something went wrong. try again later.')
		// 	}
		// }
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography component='h1' variant='h5'>
							Reset password
						</Typography>
						<Box
							component='form'
							onSubmit={forgotPasswordHandler}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								autoFocus
								required
								fullWidth
								margin='normal'
								id='password'
								name='password'
								label='Password'
								type='password'
								onChange={inputChangeHandler}
							/>
							<span style={{ color: 'red' }}>
								{errors?.passwordError !== '' &&
									errors?.passwordError}
							</span>
							<TextField
								required
								fullWidth
								margin='normal'
								id='passwordConfirm'
								name='passwordConfirm'
								label='Password Confirm'
								type='password'
								onChange={inputChangeHandler}
							/>
							<span style={{ color: 'red' }}>
								{errors?.passwordConfirmError !== '' &&
									errors?.passwordConfirmError}
							</span>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Reset password
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	)
}

export default ResetPassword
