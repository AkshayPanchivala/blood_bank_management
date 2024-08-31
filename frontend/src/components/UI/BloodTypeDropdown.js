import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import bloodtypes from '../../bloodtypes.json'

const BloodTypeDropdown = ({ bloodtypeData, title }) => {
	const [open, setOpen] = useState(false)

	const handleChange = (event) => {
		bloodtypeData(event.target.value)
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
					defaultValue='0'
				>
					<MenuItem key='0' value='0'>
						Select Bloodtype
					</MenuItem>
					{bloodtypes &&
						bloodtypes?.map((data) => (
							<MenuItem key={data?.id} value={data?.bloodType}>
								{data?.bloodType}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</>
	)
}

export default BloodTypeDropdown
