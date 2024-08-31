import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { loginAdmin, loginBloodbank, loginUser } from '../../store/loginslice'

const theme = createTheme()

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { role } = useParams()
	const [errors, setErrors] = useState({
		emailError: '',
		passwordError: '',
	})

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const inputChangeHandler = (event) => {
		const { name, value } = event?.target

		if (name === 'email') {
			setErrors((errors) => {
				return { ...errors, emailError: '' }
			})
		}
		if (name === 'password') {
			setErrors((errors) => {
				return { ...errors, passwordError: '' }
			})
		}

		setUser(() => {
			return { ...user, [name]: value }
		})
	}

	const validateInputs = () => {
		let err = 0
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
		if (!emailRegex.test(user?.email)) {
			setErrors((errors) => {
				return { ...errors, emailError: 'Invalid Email address.' }
			})
			err++
		}
		if (user?.password?.length < 8 || user?.password?.length > 20) {
			setErrors((errors) => {
				return {
					...errors,
					passwordError:
						'Password must be between 8 and 20 characters.',
				}
			})
			err++
		}
		if (err !== 0) return false
		return true
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const error = validateInputs()

		if (error) {
			if (role === 'user') {
				const response = await dispatch(loginUser(user))
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success('Login Success.')
					navigate('/user')
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			} else if (role === 'bloodbank') {
				const response = await dispatch(loginBloodbank(user))
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success('Login Success.')
					navigate('/bloodbank')
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			} else if (role === 'admin') {
				const response = await dispatch(loginAdmin(user))
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success('Login Success.')
					navigate('/admin/bloodbanks')
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			}
		}
	}

	return (
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
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							autoFocus
							required
							fullWidth
							margin='normal'
							id='email'
							name='email'
							label='Email'
							onChange={inputChangeHandler}
						/>
						<span style={{ color: 'red' }}>
							{errors?.emailError !== '' && errors?.emailError}
						</span>
						<TextField
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
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Login
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='/forgotpassword/user' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								{role === 'user' && (
									<Link to='/user/signup' variant='body2'>
										{'Don`t have an account? Sign Up'}
									</Link>
								)}
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Login
