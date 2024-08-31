import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	acceptDonateRequest,
	fulfilledDonateRequest,
	getDonateBloodbankDataQuery,
	rejectDonateRequest,
} from '../../../store/donateRequestsSlice'
import RequestStates from '../../UI/RequestStates'
import BloodTypeDropdown from '../../UI/BloodTypeDropdown'
import TableLoader from '../../UI/TableLoader'

const DonorRequests = () => {
	const dispatch = useDispatch()
	const [pendingOpen, setPendingOpen] = useState(false)
	const [acceptedOpen, setAcceptedOpen] = useState(false)
	const [whenToGive, setWhenToGive] = useState(
		new Date().toJSON().slice(0, 10)
	)
	const [id, setId] = useState('')
	const [bloodType, setBloodType] = useState('')
	const [stage, setStage] = useState('')
	const [status, setStatus] = useState('')
	const { donateRequests, isLoading } = useSelector(
		(state) => state?.donaterequests
	)

	useEffect(() => {
		dispatch(getDonateBloodbankDataQuery('All'))
	}, [dispatch])

	const handleClickPendingOpen = (id, status) => {
		setPendingOpen(true)
		setId(id)
		setStatus(status)
	}

	const handlePendingClose = () => {
		setPendingOpen(false)
	}

	const handleClickAcceptedOpen = (id, status) => {
		setAcceptedOpen(true)
		setId(id)
		setStatus(status)
	}

	const handleAcceptedClose = () => {
		setAcceptedOpen(false)
	}

	const onStageChangeHandler = (stage) => {
		setStage(stage)
		dispatch(getDonateBloodbankDataQuery(stage))
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
	}

	const validateInput = () => {
		if (!bloodType) {
			toast.error('Select Blood type.')
			return false
		}
		return true
	}

	const handleReject = async () => {
		const response = await dispatch(rejectDonateRequest(id))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
		}

		setPendingOpen(false)
		setAcceptedOpen(false)

		if (stage === 'Accepted')
			dispatch(getDonateBloodbankDataQuery('Accepted'))
		else if (stage === 'Pending')
			dispatch(getDonateBloodbankDataQuery('Pending'))
		else dispatch(getDonateBloodbankDataQuery('All'))
	}

	const handleSubmit = async () => {
		if (status === 'Accepted') {
			const validate = validateInput()
			if (validate) {
				const response = await dispatch(
					fulfilledDonateRequest({ id, whenToGive, bloodType })
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
			const response = await dispatch(
				acceptDonateRequest({ id, whenToGive })
			)
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
			dispatch(getDonateBloodbankDataQuery('Accepted'))
		else if (stage === 'Pending')
			dispatch(getDonateBloodbankDataQuery('Pending'))
		else dispatch(getDonateBloodbankDataQuery('All'))
	}

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={9}>
					<h1 style={{ color: '#ff0000' }}>Donor Requests</h1>
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
									<TableCell>Donor Name</TableCell>
									<TableCell>Blood Type</TableCell>
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
								{donateRequests !== null &&
									isLoading === false &&
									donateRequests?.map((data, index) => (
										<TableRow key={index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>
												{data?.userId?.firstName}{' '}
												{data?.userId?.lastName}
											</TableCell>
											<TableCell>
												{data?.bloodType === ''
													? 'unknown'
													: data?.bloodType}
											</TableCell>
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
												{data?.whenToGive?.slice(0, 10)}
											</TableCell>
											<TableCell>
												{data?.message === undefined ||
												data?.message === ''
													? 'No message'
													: data?.message}
											</TableCell>
											<TableCell>
												{data.status === 'Pending' && (
													<Button
														variant='outlined'
														size='small'
														onClick={() =>
															handleClickPendingOpen(
																data?._id,
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
																data?.status
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
								{!donateRequests && (
									<TableRow>
										<TableCell colSpan={10} align='center'>
											<h2>There is no data Available</h2>
										</TableCell>
									</TableRow>
								)}
								{donateRequests?.length === 0 && (
									<TableRow>
										<TableCell colSpan={10} align='center'>
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
				<DialogTitle>Accept Donor request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select a date when you want to call the donor to donate
						blood
					</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						margin='dense'
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handlePendingClose}>Cancel</Button>
					<Button onClick={handleReject}>Reject Request</Button>
					<Button onClick={handleSubmit}>Accept Request</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={acceptedOpen} onClose={handleAcceptedClose}>
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
						onChange={(e) => setWhenToGive(e.target.value)}
						value={whenToGive}
					/>
					<BloodTypeDropdown
						title='Blood Type'
						bloodtypeData={setBloodtypeDataHandler}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAcceptedClose}>Cancel</Button>
					<Button onClick={handleReject}>Reject Request</Button>
					<Button onClick={handleSubmit}>FullFiled Request</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DonorRequests
