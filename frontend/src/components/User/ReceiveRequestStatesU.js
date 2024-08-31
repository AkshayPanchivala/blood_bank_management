import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import {
	editReceiveRequestByUser,
	getAllReceiveRequstsFromUser,
	rejectReceiveRequestByUser,
} from '../../store/receiverequestSlice'
import TableLoader from '../UI/TableLoader'
import RequestStates from '../UI/RequestStates'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BloodTypeDropdown from '../UI/BloodTypeDropdown'

const ReceiveRequestStatesU = () => {
	const dispatch = useDispatch()
	const { allReceiveRequests, isLoading } = useSelector(
		(state) => state?.receiverequests
	)
	const [stage, setStage] = useState('')

	const [whenDoYouWant, setWhenDoYouWant] = useState(
		new Date().toJSON().slice(0, 10)
	)
	const [status, setStatus] = useState('')
	const [id, setId] = useState('')
	const [bloodType, setBloodType] = useState('')
	const [unit, setUnit] = useState('')
	const [pendingOpen, setPendingOpen] = useState(false)
	const [acceptOpen, setAcceptOpen] = React.useState(false)

	useEffect(() => {
		dispatch(getAllReceiveRequstsFromUser('All'))
	}, [dispatch])

	const onStageChangeHandler = (stage) => {
		setStage(stage)
		dispatch(getAllReceiveRequstsFromUser(stage))
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const handleClickOpen = (id, bloodType, whenDoYouWant, status, unit) => {
		setPendingOpen(true)
		setId(id)
		setBloodType(bloodType)
		setWhenDoYouWant(new Date(whenDoYouWant).toJSON().slice(0, 10))
		setStatus(status)
		setUnit(unit)
	}

	const handleClickClose = () => {
		setPendingOpen(false)
	}

	const handleClickOpenAccept = (id) => {
		setAcceptOpen(true)
		setId(id)
	}

	const handleCloseAccept = () => {
		setAcceptOpen(false)
	}

	const handleReject = async () => {
		const response = await dispatch(rejectReceiveRequestByUser(id))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
		}

		setPendingOpen(false)
		setAcceptOpen(false)

		if (stage === 'Accepted')
			dispatch(getAllReceiveRequstsFromUser('Accepted'))
		else if (stage === 'Pending')
			dispatch(getAllReceiveRequstsFromUser('Pending'))
		else dispatch(getAllReceiveRequstsFromUser('All'))
	}

	const validateInput = () => {
		if (!bloodType) {
			toast.error('Select Blood type.')
			return false
		}
		return true
	}

	const handleSubmit = async () => {
		const validate = validateInput()

		if (validate) {
			if (status === 'Pending') {
				const response = await dispatch(
					editReceiveRequestByUser({
						id,
						whenDoYouWant,
						bloodType,
						unit,
					})
				)
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success(response?.payload?.message)
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			}

			if (stage === 'Accepted')
				dispatch(getAllReceiveRequstsFromUser('Accepted'))
			else if (stage === 'Pending')
				dispatch(getAllReceiveRequstsFromUser('Pending'))
			else dispatch(getAllReceiveRequstsFromUser('All'))
		}

		setPendingOpen(false)
	}

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={9}>
					<h1 style={{ color: '#ff0000' }}>Send request states</h1>
				</Grid>
				<Grid item xs={3}>
					<RequestStates
						title='Request Stages'
						stageData={onStageChangeHandler}
					/>
				</Grid>
			</Grid>
			{isLoading ? (
				<TableLoader />
			) : (
				<Box
					sx={{
						border: 2,
						borderColor: '#e69e9e',
					}}
				>
					<TableContainer>
						<Table
							sx={{ minWidth: 700 }}
							aria-label='customized table'
						>
							<TableHead>
								<TableRow
									selected={true}
									style={{ backgroundColor: '#f0b4b4' }}
								>
									<TableCell>S.No</TableCell>
									<TableCell>BloodBank Name</TableCell>
									<TableCell>Contact Person</TableCell>
									<TableCell>Phone</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Address</TableCell>
									<TableCell>Pin Code</TableCell>
									<TableCell>State</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>City</TableCell>
									<TableCell>Blood type</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>Message</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allReceiveRequests.map((data) => (
									<TableRow key={data?._id}>
										<TableCell>{data?.index}</TableCell>
										<TableCell>
											{data?.bloodbankName}
										</TableCell>
										<TableCell>
											{data?.contactPerson}
										</TableCell>
										<TableCell>{data?.category}</TableCell>
										<TableCell>{data?.email}</TableCell>
										<TableCell>{data?.phoneNo1}</TableCell>
										<TableCell>{data?.address}</TableCell>
										<TableCell>{data?.pinCode}</TableCell>
										<TableCell>{data?.state}</TableCell>
										<TableCell>{data?.city}</TableCell>
										<TableCell>{data?.bloodType}</TableCell>
										<TableCell>{data?.unit}</TableCell>
										<TableCell>
											{new Date(data?.whenDoYouWant)
												?.toJSON()
												?.slice(0, 10)}
										</TableCell>
										<TableCell>
											{data?.message === undefined ||
											data?.message === ''
												? 'No message'
												: data?.message}
										</TableCell>
										<TableCell>
											{data?.status === 'Pending' && (
												<Button
													variant='outlined'
													size='small'
													onClick={() =>
														handleClickOpen(
															data?._id,
															data?.bloodType,
															data?.whenDoYouWant,
															data?.status,
															data?.unit
														)
													}
												>
													{data?.status}
												</Button>
											)}
											{data?.status === 'Accepted' && (
												<Button
													variant='outlined'
													size='small'
													onClick={() =>
														handleClickOpenAccept(
															data?._id
														)
													}
												>
													{data?.status}
												</Button>
											)}
											{data?.status !== 'Pending' &&
												data?.status !== 'Accepted' &&
												data?.status}
										</TableCell>
									</TableRow>
								))}
								{allReceiveRequests?.length === 0 && (
									<TableRow>
										<TableCell colSpan={15} align='center'>
											<h2>There is no data Available</h2>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}

			<Dialog open={pendingOpen} onClose={handleClickClose}>
				<DialogTitle>Fullfiled Donor Request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select a date when you want to call the donor to donate
						blood
					</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						margin='dense'
						label='Date'
						id='date'
						name='date'
						type='date'
                        inputProps={{
							min: new Date().toISOString().slice(0, 10),
						}}
						onChange={(e) => setWhenDoYouWant(e.target.value)}
						value={whenDoYouWant}
					/>
					<BloodTypeDropdown
						title='Blood Type'
						bloodtypeData={setBloodtypeDataHandler}
					/>
					<TextField
						fullWidth
						margin='dense'
						id='unit'
						name='unit'
						label='How many Unit you want'
						type='number'
						onChange={(e) => setUnit(e.target.value)}
						value={unit}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickClose}>Cancel</Button>
					<Button onClick={handleReject}>Reject Request</Button>
					<Button onClick={handleSubmit}>Edit Request</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={acceptOpen}
				onClose={handleCloseAccept}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Alert</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete request?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAccept}>No</Button>
					<Button onClick={handleReject} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ReceiveRequestStatesU
