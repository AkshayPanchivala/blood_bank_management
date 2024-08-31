import {
	Box,
	Button,
	Grid,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import { getBloodbanks } from '../../store/bloodbankSlice'

const BloodbankList = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { bloodbanks } = useSelector((state) => state?.bloodbanks)

	useEffect(() => {
		dispatch(getBloodbanks(''))
	}, [dispatch])

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={9}>
					<h1 style={{ color: '#ff0000' }}>Bloodbanks</h1>
				</Grid>
				<Grid item xs={3}>
					<h1>
						<Button
							startIcon={
								<SvgIcon fontSize='small'>
									<PlusIcon />
								</SvgIcon>
							}
							variant='contained'
							onClick={() => navigate('/admin/addbloodbank')}
						>
							Add Bloodbank
						</Button>
					</h1>
				</Grid>
			</Grid>

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
								{/* <TableCell>Status</TableCell> */}
								<TableCell>Blood Bank</TableCell>
								<TableCell>contact Person</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Address</TableCell>
								<TableCell>State</TableCell>
								<TableCell>City</TableCell>
								<TableCell>Pin Code</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Phone</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bloodbanks &&
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
												{/* <TableCell>
													{bloodbank?.status
														? 'Active'
														: 'Inactive'}
												</TableCell> */}
												<TableCell>
													{bloodbank?.bloodbankName}
												</TableCell>
												<TableCell>
													{bloodbank?.contactPerson}
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
													{bloodbank?.state}
												</TableCell>
												<TableCell>
													{bloodbank?.city}
												</TableCell>
												<TableCell>
													{bloodbank?.pinCode}
												</TableCell>
												<TableCell>
													{bloodbank?.email}
												</TableCell>
												<TableCell>
													{bloodbank?.phoneNo1},{' '}
													{bloodbank?.phoneNo2}
												</TableCell>
											</TableRow>
										</React.Fragment>
									)
								})}
							{bloodbanks?.length === 0 && (
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
		</>
	)
}

export default BloodbankList
