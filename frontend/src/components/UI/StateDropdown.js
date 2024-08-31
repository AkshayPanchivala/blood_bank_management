import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getStates } from '../../store/stateSlice'

const Dropdown = ({ title, stateName, stateChangeHandler }) => {
	const states = useSelector((state) => state?.states?.states)
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getStates())
	}, [dispatch])

	const handleChange = (event) => {
		stateChangeHandler(event.target.value)
	}

	return (
		<>
			<FormControl sx={{ m: 1, minWidth: 180 }}>
				<InputLabel id='demo-controlled-open-select-label'>
					{title}
				</InputLabel>
				<Select
					labelId='demo-controlled-open-select-label'
					id='demo-controlled-open-select'
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label={title}
					onChange={handleChange}
					defaultValue={stateName ? stateName : '0'}
				>
					<MenuItem key='0' value='0'>
						Select state
					</MenuItem>
					{states &&
						states.map((data) => {
							return (
								<MenuItem
									key={data?.stateName}
									value={data?.stateName}
								>
									{data?.stateName}
								</MenuItem>
							)
						})}
				</Select>
			</FormControl>
		</>
	)
}

export default Dropdown
