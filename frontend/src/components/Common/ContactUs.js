import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { addContactus } from '../../store/contactUsSlice'

const theme = createTheme()

const ContactUs = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	let errors = 0

	const validateInputs = () => {
		if (email.length === 0) {
			toast.error('Please enter your email')
			errors++
			return
		}
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email)) {
			toast.error('Invalid email')
			errors++
			return
		}
		if (phone.length === 0) {
			toast.error('Please enter phone number')
			errors++
			return
		}
		if (phone.length !== 10) {
			toast.error('Phone number must be 10 Digit')
			errors++
			return
		}
		if (message.length === 0) {
			toast.error('Please enter any message')
			errors++
			return
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		validateInputs()

		if (errors === 0) {
			const response = await dispatch(
				addContactus({ email, phone, message })
			)
			if (response?.meta?.requestStatus === 'fulfilled') {
				toast.success(response?.payload?.message)
				navigate('/')
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
							Contact us
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								required
								fullWidth
								margin='normal'
								id='email'
								name='email'
								label='Email'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								required
								fullWidth
								margin='normal'
								id='phone'
								name='phone'
								label='Phone No'
								type='number'
								onChange={(e) => setPhone(e.target.value)}
							/>
							<TextField
								required
								fullWidth
								margin='normal'
								id='message'
								name='message'
								label='Message'
								onChange={(e) => setMessage(e.target.value)}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Contact
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	)
}

export default ContactUs
