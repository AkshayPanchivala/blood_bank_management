import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Table, TableBody, TableCell, TableContainer } from '@mui/material'
import { Container, TableHead, TableRow } from '@mui/material'
import StateDropdown from '../../UI/StateDropdown'
import CityDropdown from '../../UI/CityDropdown'
import BloodbankList from './BloodbankList'
import {
	clearBloodbankData,
	getBloodbanks,
} from '../../../store/bloodbankSlice'

const WantToDonate = () => {
	const dispatch = useDispatch()
	const [stateName, setStateName] = useState('')

	useEffect(() => {
		dispatch(clearBloodbankData())
	}, [dispatch])

	const stateChangeHandler = (stateName) => {
		setStateName(stateName)
		dispatch(getBloodbanks(`state=${stateName}`))
	}

	const cityChangeHandler = (cityName) => {
		dispatch(getBloodbanks(`state=${stateName}&city=${cityName}`))
	}

	return (
		<>
			<h2>Send Donate Request</h2>
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
								<TableCell align='left' colSpan={3}>
									Search Blood Stock
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody></TableBody>
					</Table>
				</TableContainer>
				<Container>
					<Box
						sx={{
							mt: 3,
							mb: 3,
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<StateDropdown
							title='State'
							stateChangeHandler={stateChangeHandler}
						/>

						<CityDropdown
							title='City'
							stateName={stateName}
							canCallApi={stateName ? true : false}
							cityChangeHandler={cityChangeHandler}
						/>
					</Box>
				</Container>
			</Box>
			<BloodbankList />
		</>
	)
}

export default WantToDonate
