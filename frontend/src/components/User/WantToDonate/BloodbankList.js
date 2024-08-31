import React, { useState } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import BloodTypeDropdown from '../../UI/BloodTypeDropdown'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { addDonateRequest } from '../../../store/donateRequestsSlice'

const BloodbankList = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { bloodbanks, isLoading } = useSelector((state) => state?.bloodbanks)
	const [bloodbankId, setBloodbankId] = useState('')
	const [bloodType, setBloodType] = useState('')
	const [whenToGive, setWhenToGive] = useState(
		new Date()?.toJSON()?.slice(0, 10)
	)
	const [open, setOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleClickOpen = (id) => {
		setOpen(true)
		setBloodbankId(id)
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const handleClose = () => {
		setOpen(false)
		setErrorMessage('')
	}

	const onSendRequestHandler = async () => {
		const response = await dispatch(
			addDonateRequest({ bloodbankId, bloodType, whenToGive })
		)
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
			navigate('/user')
		} else if (response?.meta?.requestStatus === 'rejected') {
			setErrorMessage(response?.payload?.message)
			return
		} else {
			toast.error('Something went wrong. try again later.')
		}
		setOpen(false)
	}

	return (
		<>
			<h1 style={{ color: '#ff0000' }}>Bloodbank List</h1>
			<Box
				sx={{
					border: 2,
					borderColor: '#e69e9e',
				}}
			>
				<TableContainer>
					<Table sx={{ minWidth: 700 }} aria-label='customized table'>
						<TableHead>
							<TableRow
								selected={true}
								style={{ backgroundColor: '#f0b4b4' }}
							>
								<TableCell>S.No</TableCell>
								<TableCell>Blood Bank</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Address</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Appointment</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!isLoading &&
								bloodbanks.length !== 0 &&
								bloodbanks?.map((bloodbank, index) => {
									return (
										<TableRow key={bloodbank?._id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>
												{bloodbank?.bloodbankName}
											</TableCell>
											<TableCell>
												{bloodbank?.category}
											</TableCell>
											<TableCell>
												{bloodbank?.address2}
											</TableCell>
											<TableCell>
												{bloodbank?.phoneNo1}
											</TableCell>
											<TableCell>
												<Button
													sx={{
														fontSize: '11px',
														backgroundColor:
															'#f76565',
														':hover': {
															backgroundColor:
																'red',
														},
													}}
													variant='contained'
													onClick={() =>
														handleClickOpen(
															bloodbank?._id
														)
													}
												>
													<SvgIcon fontSize='small'>
														<PlusIcon />
													</SvgIcon>
												</Button>
											</TableCell>
										</TableRow>
									)
								})}
							{bloodbanks?.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} align='center'>
										<h2>There is no data Available</h2>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Select Date and blood type</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Enter a date you want to donate blood and blood type.
						<br />
						(Blood type is not required)
					</DialogContentText>
					<TextField
						sx={{ mb: 3 }}
						autoFocus
						fullWidth
						id='date'
						name='date'
						label='Date'
						type='date'
						inputProps={{
							min: new Date().toISOString().slice(0, 10),
						}}
						onChange={(e) => setWhenToGive(e.target.value)}
						value={whenToGive}
					/>

					<BloodTypeDropdown
						title='Blood Type'
						bloodtypeData={setBloodtypeDataHandler}
					/>
					<div style={{ color: 'red' }}>
						{errorMessage !== '' && errorMessage}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={onSendRequestHandler}>Send request</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default BloodbankList
