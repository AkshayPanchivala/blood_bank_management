import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getCities } from '../../store/stateSlice'

const Dropdown = ({
	title,
	cityName,
	stateName,
	canCallApi,
	cityChangeHandler,
}) => {
	const dispatch = useDispatch()
	const { cities, isLoading } = useSelector((state) => state?.states)
	const [open, setOpen] = useState(false)

	const handleChange = (event) => {
		cityChangeHandler(event.target.value)
	}

	useEffect(() => {
		if (canCallApi) {
			dispatch(getCities(stateName))
		}
	}, [canCallApi, stateName, dispatch])

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
					defaultValue={'0'}
				>
					<MenuItem key='0' value='0'>
						Select City
					</MenuItem>
					{cities &&
						!isLoading &&
						cities?.map((data) => {
							return (
								<MenuItem
									key={data?.cityName}
									value={data?.cityName}
								>
									{data?.cityName}
								</MenuItem>
							)
						})}
				</Select>
			</FormControl>
		</>
	)
}

export default Dropdown
