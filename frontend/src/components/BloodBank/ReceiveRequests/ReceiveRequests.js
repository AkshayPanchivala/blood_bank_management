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
	fulfilledReceiveRequest,
	getReceiveBloodbankDataQuery,
	acceptReceiveRequest,
	rejectReceiveRequest,
} from '../../../store/receiverequestSlice'
import RequestStates from '../../UI/RequestStates'
import TableLoader from '../../UI/TableLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BloodTypeDropdown from '../../UI/BloodTypeDropdown'

const ReceiveRequests = () => {
	const dispatch = useDispatch()
	const [acceptedOpen, setAcceptedOpen] = useState(false)
	const [pendingOpen, setPendingOpen] = useState(false)
	const [bloodType, setBloodType] = useState('')
	const [whenDoYouWant, setWhenDoYouWant] = useState(
		new Date().toJSON().slice(0, 10)
	)
	const [stage, setStage] = useState('')
	const [id, setId] = useState('')
	const [unit, setUnit] = useState(0)
	const [status, setStatus] = useState('')
	const { receiveRequests, isLoading } = useSelector(
		(state) => state?.receiverequests
	)

	useEffect(() => {
		dispatch(getReceiveBloodbankDataQuery('All'))
	}, [dispatch])

	const handleClickAcceptedOpen = (id, status, unit) => {
		setAcceptedOpen(true)
		setId(id)
		setStatus(status)
		setUnit(unit)
	}

	const handleAcceptedClose = () => {
		setAcceptedOpen(false)
	}

	const handleClickPendingOpen = (id, status) => {
		setPendingOpen(true)
		setId(id)
		setStatus(status)
	}

	const handlePendingClose = () => {
		setPendingOpen(false)
	}

	const onStageChangeHandler = (stage) => {
		setStage(stage)
		dispatch(getReceiveBloodbankDataQuery(stage))
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const handleReject = async () => {
		const response = await dispatch(rejectReceiveRequest(id))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
		}

		setAcceptedOpen(false)
		setPendingOpen(false)

		if (stage === 'Accepted')
			dispatch(getReceiveBloodbankDataQuery('Accepted'))
		else if (stage === 'Pending')
			dispatch(getReceiveBloodbankDataQuery('Pending'))
		else dispatch(getReceiveBloodbankDataQuery('All'))
	}

	const validateInput = () => {
		if (unit === 0) {
			toast.error('Enter how many unit receiver can took.')
			return false
		}
		if (!bloodType) {
			toast.error('Select Blood type.')
			return false
		}
		return true
	}

	const handleSubmit = async () => {
		if (status === 'Accepted') {
			const validate = validateInput()
			if (validate) {
				const response = await dispatch(
					fulfilledReceiveRequest({
						id,
						whenDoYouWant,
						bloodType,
						unit: 1,
					})
				)
				if (response?.meta?.requestStatus === 'fulfilled') {
					toast.success(response?.payload?.message)
				} else if (response?.meta?.requestStatus === 'rejected') {
					toast.error(response?.payload?.message)
				} else {
					toast.error('Something went wrong. try again later.')
				}
			} else return
		} else if (status === 'Pending') {
			const response = await dispatch(acceptReceiveRequest({ id }))
			if (response?.meta?.requestStatus === 'fulfilled') {
				toast.success(response?.payload?.message)
			} else if (response?.meta?.requestStatus === 'rejected') {
				toast.error(response?.payload?.message)
			} else {
				toast.error('Something went wrong. try again later.')
			}
		}

		setPendingOpen(false)
		setAcceptedOpen(false)

		if (stage === 'Accepted')
			dispatch(getReceiveBloodbankDataQuery('Accepted'))
		else if (stage === 'Pending')
			dispatch(getReceiveBloodbankDataQuery('Pending'))
		else dispatch(getReceiveBloodbankDataQuery('All'))
	}

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={9}>
					<h1 style={{ color: '#ff0000' }}>Received Requests</h1>
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
									<TableCell>Receiver Name</TableCell>
									<TableCell>Blood Group</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Address</TableCell>
									<TableCell>City</TableCell>
									<TableCell>Phone</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>Message</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{receiveRequests !== null &&
									isLoading === false &&
									receiveRequests?.map((data, index) => (
										<TableRow key={index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>
												{data?.userId?.firstName}{' '}
												{data?.userId?.lastName}
											</TableCell>
											<TableCell>
												{data?.bloodType === ''
													? 'null'
													: data?.bloodType}
											</TableCell>
											<TableCell>{data?.unit}</TableCell>
											<TableCell>
												{data?.userId?.address}
											</TableCell>
											<TableCell>
												{data?.userId?.city}
											</TableCell>
											<TableCell>
												{data?.userId?.phoneNo1}
											</TableCell>
											<TableCell>
												{data?.userId?.email}
											</TableCell>
											<TableCell>
												{data?.whenDoYouWant?.slice(
													0,
													10
												)}
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
															handleClickPendingOpen(
																data._id,
																data?.status
															)
														}
													>
														{data?.status}
													</Button>
												)}
												{data.status === 'Accepted' && (
													<Button
														variant='outlined'
														size='small'
														onClick={() =>
															handleClickAcceptedOpen(
																data?._id,
																data?.status,
																data?.unit
															)
														}
													>
														{data?.status}
													</Button>
												)}
												{data?.status !== 'Pending' &&
													data?.status !==
														'Accepted' &&
													data?.status}
											</TableCell>
										</TableRow>
									))}
								{receiveRequests?.length === 0 && (
									<TableRow>
										<TableCell colSpan={11} align='center'>
											<h2>There is no data Available</h2>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}

			<Dialog open={pendingOpen} onClose={handlePendingClose}>
				<DialogTitle>Select any one option</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to accept or reject reqquest
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handlePendingClose}>Cancel</Button>
					<Button onClick={handleReject}>Reject Request</Button>
					<Button onClick={handleSubmit}>Accept Request</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={acceptedOpen} onClose={handleAcceptedClose}>
				<DialogTitle>Fullfiled Receive Request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select a date when you want to call the donor to donate
						blood
					</DialogContentText>
					<TextField
						sx={{ mb: 3 }}
						autoFocus
						fullWidth
						margin='dense'
						id='date'
						name='date'
						label='Date'
						type='date'
						onChange={(e) => setWhenDoYouWant(e.target.value)}
						value={new Date().toJSON().slice(0, 10)}
					/>
					<TextField
						sx={{ mb: 3 }}
						fullWidth
						label='How many Unit you want'
						id='unit'
						name='unit'
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
					<Button onClick={handleAcceptedClose}>Cancel</Button>
					<Button onClick={handleReject}>Reject Request</Button>
					<Button onClick={handleSubmit}>Accept Response</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ReceiveRequests
