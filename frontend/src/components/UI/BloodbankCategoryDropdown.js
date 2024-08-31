import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const categories = [
	{ id: 1, name: 'Government' },
	{ id: 2, name: 'RedCross' },
	{ id: 3, name: 'Private' },
]

const BloodbankCategoryDropdown = ({
	touched,
	errors,
	values,
	handleChange,
}) => {
	const [open, setOpen] = React.useState(false)

	return (
		<>
			<FormControl sx={{ m: 1, minWidth: 379 }}>
				<InputLabel id='demo-controlled-open-select-label'>
					Category
				</InputLabel>
				<Select
					error={touched?.category && errors?.category ? true : false}
					fullWidth
					labelId='demo-controlled-open-select-label'
					id='category'
					name='category'
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					label='Category'
					onChange={handleChange}
					value={values.category}
				>
					<MenuItem key='0' value='0'>
						Select Category
					</MenuItem>
					{categories.map((data) => {
						return (
							<MenuItem key={data?.id} value={data?.name}>
								{data?.name}
							</MenuItem>
						)
					})}
				</Select>
				{touched?.category && errors?.category && (
					<div className='error-text-display'>{errors?.category}</div>
				)}
			</FormControl>
		</>
	)
}

export default BloodbankCategoryDropdown
