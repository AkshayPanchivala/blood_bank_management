import React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import StateDropdown from '../UI/StateDropdownFormik'
import CityDropdown from '../UI/CityDropdownFromik'
import BloodbankCategoryDropdown from '../UI/BloodbankCategoryDropdown'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { registerBloodbank } from '../../store/bloodbankSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const theme = createTheme()

const validationSchema = Yup.object({
	state: Yup.string().required('*State name is required.'),
	city: Yup.string().required('*City name is required.'),
	category: Yup.string().required('*Select Category.'),
	bloodbankName: Yup.string().required('*Bloodbank name is required.'),
	contactPerson: Yup.string().required('*Contact Person is required.'),
	address1: Yup.string().required('*Address line 1 is required.'),
	address2: Yup.string().required('*Address line 2 is required.'),
	pinCode: Yup.number()
		.required('*Pin code is required.')
		.positive(`Pin code can't start with a minus.`)
		.integer(`Pin code can't include a decimal point.`)
		.min(6, 'Pin code must be exactly 6 digits'),
	phoneNo1: Yup.number()
		.required('*A phone number is required.')
		.positive(`A phone number can't start with a minus.`)
		.integer(`A phone number can't include a decimal point.`)
		.min(10, 'Phone number must be exactly 10 digits'),
	phoneNo2: Yup.number()
		.required('*A phone number is required.')
		.positive(`A phone number can't start with a minus.`)
		.integer(`A phone number can't include a decimal point.`)
		.min(10, 'Phone number must be exactly 10 digits'),
	email: Yup.string().email().required('*Email is required.'),
	password: Yup.string()
		.required('*Password is required.')
		.min(
			8,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.'
		),
	passwordConfirm: Yup.string()
		.required('*Password Confirm is required.')
		.min(
			8,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.'
		)
		.oneOf(
			[Yup.ref('password'), null],
			'Password and passwordConfirm not match.'
		),
	openingDate: Yup.date()
		.required('Opening date is required.')
		.max(new Date(), 'The date should always be in the past.'),
})

const AddBloodbank = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { handleSubmit, handleChange, values, errors, touched } = useFormik({
		initialValues: {
			state: '',
			city: '',
			category: '',
			bloodbankName: '',
			contactPerson: '',
			address1: '',
			address2: '',
			pinCode: '',
			phoneNo1: '',
			phoneNo2: '',
			email: '',
			password: '',
			passwordConfirm: '',
			openingDate: new Date().toJSON().slice(0, 10),
		},
		validationSchema,
		onSubmit: (values) => {
			addBloodbank(values)
		},
	})

	const addBloodbank = async (body) => {
		const response = await dispatch(registerBloodbank(body))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
			navigate('/admin/bloodbanks')
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
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
							Add Bloodbank
						</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<StateDropdown
										title='State'
										touched={touched}
										errors={errors}
										values={values}
										handleChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<CityDropdown
										title='City'
										stateName={values?.state}
										canCallApi={
											values?.state ? true : false
										}
										touched={touched}
										errors={errors}
										values={values}
										handleChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12} sm={12}>
									<BloodbankCategoryDropdown
										touched={touched}
										errors={errors}
										values={values}
										handleChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12} sm={12}>
									<TextField
										error={
											touched?.bloodbankName &&
											errors?.bloodbankName
												? true
												: false
										}
										required
										fullWidth
										id='bloodbankName'
										name='bloodbankName'
										label='Bloodbank Name'
										onChange={handleChange}
										value={values?.bloodbankName}
									/>
									{touched?.bloodbankName &&
										errors?.bloodbankName && (
											<div className='error-text-display'>
												{errors?.bloodbankName}
											</div>
										)}
								</Grid>

								<Grid item xs={12} sm={12}>
									<TextField
										error={
											touched?.contactPerson &&
											errors?.contactPerson
												? true
												: false
										}
										required
										fullWidth
										id='contactPerson'
										name='contactPerson'
										label='Contact Person Name'
										onChange={handleChange}
										value={values?.contactPerson}
									/>
									{touched?.contactPerson &&
										errors?.contactPerson && (
											<div className='error-text-display'>
												{errors?.contactPerson}
											</div>
										)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										error={
											touched?.address1 &&
											errors?.address1
												? true
												: false
										}
										required
										fullWidth
										id='address1'
										name='address1'
										label='Address line 1'
										onChange={handleChange}
										value={values?.address1}
									/>
									{touched?.address1 && errors?.address1 && (
										<div className='error-text-display'>
											{errors?.address1}
										</div>
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										error={
											touched?.address2 &&
											errors?.address2
												? true
												: false
										}
										required
										fullWidth
										id='address2'
										name='address2'
										label='Address line 2'
										onChange={handleChange}
										value={values?.address2}
									/>
									{touched?.address2 && errors?.address2 && (
										<div className='error-text-display'>
											{errors?.address2}
										</div>
									)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										error={
											touched?.pinCode && errors?.pinCode
												? true
												: false
										}
										required
										fullWidth
										id='pinCode'
										name='pinCode'
										label='Pin Code'
										type='number'
										onChange={handleChange}
										value={values?.pinCode}
									/>
									{touched?.pinCode && errors?.pinCode && (
										<div className='error-text-display'>
											{errors?.pinCode}
										</div>
									)}
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										error={
											touched?.phoneNo1 &&
											errors?.phoneNo1
												? true
												: false
										}
										required
										fullWidth
										id='phoneNo1'
										name='phoneNo1'
										label='Phone number 1'
										type='number'
										onChange={handleChange}
										value={values?.phoneNo1}
									/>
									{touched?.phoneNo1 && errors?.phoneNo1 && (
										<div className='error-text-display'>
											{errors?.phoneNo1}
										</div>
									)}
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										error={
											touched?.phoneNo2 &&
											errors?.phoneNo2
												? true
												: false
										}
										required
										fullWidth
										id='phoneNo2'
										name='phoneNo2'
										label='Phone number 2'
										type='number'
										onChange={handleChange}
										value={values?.phoneNo2}
									/>
									{touched?.phoneNo2 && errors?.phoneNo2 && (
										<div className='error-text-display'>
											{errors?.phoneNo2}
										</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={
											touched?.email && errors?.email
												? true
												: false
										}
										required
										fullWidth
										id='email'
										name='email'
										label='Email Address'
										onChange={handleChange}
										value={values?.email}
									/>
									{touched?.email && errors?.email && (
										<div className='error-text-display'>
											{errors?.email}
										</div>
									)}
								</Grid>

								<Grid item xs={12} sm={12}>
									<TextField
										error={
											touched?.openingDate &&
											errors?.openingDate
												? true
												: false
										}
										required
										fullWidth
										id='openingDate'
										name='openingDate'
										label='Opening Date'
										type='date'
										inputProps={{
											max: new Date()
												.toISOString()
												.slice(0, 10),
										}}
										onChange={handleChange}
										value={values?.openingDate}
									/>
									{touched?.openingDate &&
										errors?.openingDate && (
											<div className='error-text-display'>
												{errors?.openingDate}
											</div>
										)}
								</Grid>

								<Grid item xs={12}>
									<TextField
										error={
											touched?.password &&
											errors?.password
												? true
												: false
										}
										required
										fullWidth
										id='password'
										name='password'
										label='Password'
										type='password'
										onChange={handleChange}
										value={values?.password}
									/>
									{touched?.password && errors?.password && (
										<div className='error-text-display'>
											{errors?.password}
										</div>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										error={
											touched?.passwordConfirm &&
											errors?.passwordConfirm
												? true
												: false
										}
										required
										fullWidth
										id='passwordConfirm'
										name='passwordConfirm'
										label='Password Confirm'
										type='password'
										onChange={handleChange}
										value={values?.passwordConfirm}
									/>
									{touched?.passwordConfirm &&
										errors?.passwordConfirm && (
											<div className='error-text-display'>
												{errors?.passwordConfirm}
											</div>
										)}
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Register
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	)
}

export default AddBloodbank
