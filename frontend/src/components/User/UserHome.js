import React, { useEffect } from 'react'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDonateStates } from '../../store/donateStatesSlice'
import { getUserRequestsStates } from '../../store/receiveStatesSlice'

const UserHome = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const donatestates = useSelector((state) => state?.donatestates)
	const receivestates = useSelector((state) => state?.receivestates)

	useEffect(() => {
		dispatch(getUserDonateStates())
		dispatch(getUserRequestsStates())
	}, [dispatch])

	return (
		<>
			<Grid container spacing={2} columns={12} sx={{ mb: 10 }}>
				<Grid item xs={6}>
					<Card sx={{ backgroundColor: 'transparent' }}>
						<CardContent>
							<Typography sx={{ fontSize: 14, mb: 1 }}>
								Donation Requests
							</Typography>
							<Typography
								sx={{ color: 'orange' }}
								variant='h6'
								component='div'
							>
								Pedding Requests
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{donatestates?.Pending
									? donatestates?.Pending
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'rgb(111, 197, 217)' }}
								variant='h6'
								component='div'
							>
								Accepted Requests
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{donatestates?.Accepted
									? donatestates?.Accepted
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'green' }}
								variant='h6'
								component='div'
							>
								Fullfiled Request
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{donatestates?.Fulfilled
									? donatestates?.Fulfilled
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'red' }}
								variant='h6'
								component='div'
							>
								Rejected Request
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{donatestates?.Rejected
									? donatestates?.Rejected
									: 0}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								onClick={() =>
									navigate('/user/donaterequestsstates')
								}
							>
								Learn More
							</Button>
						</CardActions>
					</Card>
				</Grid>

				<Grid item xs={6}>
					<Card sx={{ backgroundColor: 'transparent' }}>
						<CardContent>
							<Typography sx={{ fontSize: 14, mb: 1 }}>
								Blood Requests
							</Typography>
							<Typography
								sx={{ color: 'orange' }}
								variant='h6'
								component='div'
							>
								Pedding Requests
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{receivestates?.Pending
									? receivestates?.Pending
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'rgb(111, 197, 217)' }}
								variant='h6'
								component='div'
							>
								Accepted Requests
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{receivestates?.Accepted
									? receivestates?.Accepted
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'green' }}
								variant='h6'
								component='div'
							>
								Fullfiled Request
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{receivestates?.Fulfilled
									? receivestates?.Fulfilled
									: 0}
							</Typography>
							<Typography
								sx={{ color: 'red' }}
								variant='h6'
								component='div'
							>
								Rejected Request
							</Typography>
							<Typography sx={{ mb: 1.5 }} color='text.secondary'>
								{receivestates?.Rejected
									? receivestates?.Rejected
									: 0}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								onClick={() =>
									navigate('/user/receiverequestsstates')
								}
							>
								Learn More
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</>
	)
}

export default UserHome
