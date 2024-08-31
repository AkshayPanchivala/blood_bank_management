import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getStates } from '../../store/stateSlice'

const Dropdown = ({ title, touched, errors, values, handleChange }) => {
	const states = useSelector((state) => state?.states?.states)
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getStates())
	}, [dispatch])

	return (
		<>
			<FormControl sx={{ m: 1, minWidth: 180 }}>
				<InputLabel id='demo-controlled-open-select-label'>
					{title}
				</InputLabel>
				<Select
					error={touched?.state && errors?.state ? true : false}
					labelId='demo-controlled-open-select-label'
					id='state'
					name='state'
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label={title}
					onChange={handleChange}
					value={values.state}
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
				{touched?.state && errors?.state && (
					<div className='error-text-display'>{errors?.state}</div>
				)}
			</FormControl>
		</>
	)
}

export default Dropdown
