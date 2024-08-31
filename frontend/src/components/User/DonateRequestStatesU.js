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
	editDonateRequestByUser,
	getAllDonateRequstsFromuser,
	rejectDonateRequestByUser,
} from '../../store/donateRequestsSlice'
import TableLoader from '../UI/TableLoader'
import RequestStates from '../UI/RequestStates'
import BloodTypeDropdown from '../UI/BloodTypeDropdown'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DonateRequestStatesU = () => {
	const dispatch = useDispatch()
	const { allDonateRequests, isLoading } = useSelector(
		(state) => state?.donaterequests
	)
	const [stage, setStage] = useState('')
	const [whenToGive, setWhenToGive] = useState(
		new Date().toJSON().slice(0, 10)
	)
	const [status, setStatus] = useState('')
	const [id, setId] = useState('')
	const [bloodType, setBloodType] = useState('')
	const [pendingOpen, setPendingOpen] = useState(false)
	const [acceptOpen, setAcceptOpen] = React.useState(false)

	useEffect(() => {
		dispatch(getAllDonateRequstsFromuser('All'))
	}, [dispatch])

	const onStageChangeHandler = (stage) => {
		setStage(stage)
		dispatch(getAllDonateRequstsFromuser(stage))
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const handleClickOpen = (id, bloodType, whenToGive, status) => {
		setPendingOpen(true)
		setId(id)
		setBloodType(bloodType)
		setWhenToGive(new Date(whenToGive).toJSON().slice(0, 10))
		setStatus(status)
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
		const response = await dispatch(rejectDonateRequestByUser(id))
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
			dispatch(getAllDonateRequstsFromuser('Accepted'))
		else if (stage === 'Pending')
			dispatch(getAllDonateRequstsFromuser('Pending'))
		else dispatch(getAllDonateRequstsFromuser('All'))
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
					editDonateRequestByUser({ id, whenToGive, bloodType })
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
				dispatch(getAllDonateRequstsFromuser('Accepted'))
			else if (stage === 'Pending')
				dispatch(getAllDonateRequstsFromuser('Pending'))
			else dispatch(getAllDonateRequstsFromuser('All'))
		}

		setPendingOpen(false)
	}

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={9}>
					<h1 style={{ color: '#ff0000' }}>Donate request states</h1>
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
									<TableCell>Date</TableCell>
									<TableCell>Message</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allDonateRequests.map((data) => (
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
										<TableCell>
											{data?.bloodType === '' ||
											data?.bloodType === undefined
												? 'Unknown'
												: data?.bloodType}
										</TableCell>
										<TableCell>
											{new Date(data?.whenToGive)
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
															data?.whenToGive,
															data?.status
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
								{allDonateRequests?.length === 0 && (
									<TableRow>
										<TableCell colSpan={14} align='center'>
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
						margin='dense'
						fullWidth
						label='Date'
						id='date'
						name='date'
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

export default DonateRequestStatesU
