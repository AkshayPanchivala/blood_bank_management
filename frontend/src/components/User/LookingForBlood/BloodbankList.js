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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import BloodTypeDropdown from '../../UI/BloodTypeDropdown'
import { useNavigate } from 'react-router-dom'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { addReceiveRequest } from '../../../store/receiverequestSlice'

const BloodbankList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { bloodbanks, isLoading } = useSelector((state) => state?.bloodbanks)
	const [open, setOpen] = useState(false)
	const [bloodbankId, setBloodbankId] = useState('')
	const [bloodType, setBloodType] = useState('')
	const [whenDoYouWant, setWhenDoYouWant] = useState(
		new Date().toJSON().slice(0, 10)
	)
	const [unit, setUnit] = useState(0)

	const handleClickOpen = (id) => {
		setOpen(true)
		setBloodbankId(id)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const validateInput = () => {
		if (unit === 0) {
			toast.error('Enter how many unit you want.')
			return false
		}
		if (!bloodType) {
			toast.error('Select Blood type.')
			return false
		}
		return true
	}

	const handleSubmit = async () => {
		const validate = validateInput()
		if (validate) {
			const response = await dispatch(
				addReceiveRequest({
					bloodbankId,
					bloodType,
					unit,
					whenDoYouWant,
				})
			)
			if (response?.meta?.requestStatus === 'fulfilled') {
				toast.success(response?.payload?.message)
				navigate('/user')
			} else if (response?.meta?.requestStatus === 'rejected') {
				toast.error(response?.payload?.message)
			} else {
				toast.error('Something went wrong. try again later.')
			}
			setOpen(false)
		}
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
								bloodbanks?.length !== 0 &&
								bloodbanks?.map((bloodbank, index) => {
									return (
										<React.Fragment key={bloodbank?._id}>
											<TableRow
												style={{
													backgroundColor: '##ffffff',
												}}
											>
												<TableCell>
													{index + 1}
												</TableCell>
												<TableCell>
													{bloodbank?.bloodbankName}
												</TableCell>
												<TableCell>
													{bloodbank?.category}
												</TableCell>
												<TableCell>
													{bloodbank?.address1 +
														', ' +
														bloodbank?.address2}
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
																bloodbank._id
															)
														}
													>
														<SvgIcon fontSize='small'>
															<PlusIcon />
														</SvgIcon>
													</Button>
												</TableCell>
											</TableRow>
										</React.Fragment>
									)
								})}
							{!isLoading && bloodbanks?.length === 0 && (
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
				<DialogTitle>Select date, unit and bloodtype</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Enter a date, blood type and how many unit blood you
						want to receive.
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
						onChange={(e) => setWhenDoYouWant(e.target.value)}
						value={whenDoYouWant}
					/>
					<TextField
						sx={{ mb: 3 }}
						fullWidth
						id='unit'
						name='unit'
						label='How many Unit you want'
						type='number'
						onChange={(e) => setUnit(e.target.value)}
						value={unit}
					/>
					<BloodTypeDropdown
						title='Blood Type'
						bloodtypeData={setBloodtypeDataHandler}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Send Request</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default BloodbankList
