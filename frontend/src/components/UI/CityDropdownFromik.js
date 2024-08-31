import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { getCities } from '../../store/stateSlice'

const Dropdown = ({
	stateName,
	handleChange,
	values,
	errors,
	touched,
	title,
	canCallApi,
}) => {
	const dispatch = useDispatch()
	const { cities, isLoading } = useSelector((state) => state?.states)
	const [open, setOpen] = useState(false)

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
					error={touched?.state && errors?.state ? true : false}
					labelId='demo-controlled-open-select-label'
					id='city'
					name='city'
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label={title}
					onChange={handleChange}
					value={values?.city}
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
				{touched?.city && errors?.city && (
					<div className='error-text-display'>{errors?.city}</div>
				)}
			</FormControl>
		</>
	)
}

export default Dropdown
