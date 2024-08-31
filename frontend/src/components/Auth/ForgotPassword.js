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
import { forgotPassword } from '../../store/passwordSlice'

const theme = createTheme()

const ForgotPassword = () => {
	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const forgotPasswordHandler = async (event) => {
		event.preventDefault()

		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email)) {
			setEmailError('Invalid Email address.')
			return
		}

		if (params.role === 'user') {
			const response = await dispatch(forgotPassword(email))
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
							Forgot password
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
								id='email'
								name='email'
								label='Email'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span style={{ color: 'red' }}>
								{emailError !== '' && emailError}
							</span>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Forgot password
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	)
}

export default ForgotPassword
