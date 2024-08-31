import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { getAllReceiveRequstsFromBloodbank } from '../../store/receiverequestSlice'
import TableLoader from '../UI/TableLoader'

const ReceiveRequestStates = () => {
	const dispatch = useDispatch()
	const { allReceiveRequests, isLoading } = useSelector(
		(state) => state?.receiverequests
	)

	useEffect(() => {
		dispatch(getAllReceiveRequstsFromBloodbank())
	}, [dispatch])

	return (
		<>
			<h1 style={{ color: '#ff0000' }}>Received request states</h1>
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
									<TableCell>user Name</TableCell>
									<TableCell>Date of Birth</TableCell>
									<TableCell>Age</TableCell>
									<TableCell>Phone No 1</TableCell>
									<TableCell>Phone No 2</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Address</TableCell>
									<TableCell>Pin Code</TableCell>
									<TableCell>State</TableCell>
									<TableCell>City</TableCell>
									<TableCell>Blood type</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Message</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allReceiveRequests.map((data) => (
									<TableRow key={data?._id}>
										<TableCell>{data?.index}</TableCell>
										<TableCell>{data?.name}</TableCell>
										<TableCell>
											{new Date(data?.dob)
												?.toJSON()
												?.slice(0, 10)}
										</TableCell>
										<TableCell>{data?.age}</TableCell>
										<TableCell>{data?.phoneNo1}</TableCell>
										<TableCell>{data?.phoneNo2}</TableCell>
										<TableCell>{data?.email}</TableCell>
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
										<TableCell>{data?.status}</TableCell>
										<TableCell>
											{data?.message === undefined ||
											data?.message === ''
												? 'No message'
												: data?.message}
										</TableCell>
									</TableRow>
								))}
								{allReceiveRequests?.length === 0 && (
									<TableRow>
										<TableCell colSpan={13} align='center'>
											<h2>There is no data Available</h2>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</>
	)
}

export default ReceiveRequestStates
