import React from 'react'
import logo from '../image/blooddroplogo.png'
import {
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'

const obj = [
	['O-', true, false, false, false, false, false, false, false],
	['O+', true, true, false, false, false, false, false, false],
	['A-', true, false, true, false, false, false, false, false],
	['A+', true, true, true, true, false, false, false, false],
	['B-', true, false, false, false, true, false, false, false],
	['B+', true, true, false, false, true, true, false, false],
	['AB-', true, false, true, false, true, false, true, false],
	['AB+', true, true, true, true, true, true, true, true],
]

const BloodCompatible = () => {
	return (
		<>
			<TableContainer>
				<Table size='small'>
					<TableHead>
						<TableRow
							selected={true}
							style={{ backgroundColor: '#f0b4b4' }}
						>
							<TableCell align='center' colSpan={9}>
								Compatible Blood Type Donors
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align='left' colSpan={1}>
								Recipient
							</TableCell>
							<TableCell align='center' colSpan={8}>
								Donor
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align='left'>Blood Type</TableCell>
							<TableCell align='left'>O-</TableCell>
							<TableCell align='left'>O+</TableCell>
							<TableCell align='left'>A-</TableCell>
							<TableCell align='left'>A+</TableCell>
							<TableCell align='left'>B-</TableCell>
							<TableCell align='left'>B+</TableCell>
							<TableCell align='left'>AB-</TableCell>
							<TableCell align='left'>AB+</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{obj.map((data, i) => {
							return (
								<TableRow key={i}>
									{data.map((d, i) => {
										return (
											<React.Fragment key={i}>
												{d !== true && d !== false && (
													<TableCell align='left'>
														{d}
													</TableCell>
												)}
												{d === true && (
													<TableCell align='left'>
														<Avatar
															alt='Image'
															src={logo}
														/>
													</TableCell>
												)}
												{d === false && (
													<TableCell align='left'></TableCell>
												)}
											</React.Fragment>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default BloodCompatible
