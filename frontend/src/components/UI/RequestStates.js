import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const states = ['Pending', 'Accepted', 'Rejected', 'Fulfilled']

const RequestStates = (props) => {
	const [open, setOpen] = useState(false)

	const handleChange = (event) => {
		props?.stageData(event.target.value)
	}

	return (
		<>
			<FormControl sx={{ m: 1, minWidth: 180 }}>
				<InputLabel id='demo-controlled-open-select-label'>
					{props?.title}
				</InputLabel>
				<Select
					labelId='demo-controlled-open-select-label'
					id='demo-controlled-open-select'
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label={props?.title}
					onChange={handleChange}
					defaultValue='All'
				>
					<MenuItem key='0' value='All'>
						All
					</MenuItem>
					{states &&
						states?.map((data) => {
							return (
								<MenuItem key={data} value={data}>
									{data}
								</MenuItem>
							)
						})}
				</Select>
			</FormControl>
		</>
	)
}

export default RequestStates
