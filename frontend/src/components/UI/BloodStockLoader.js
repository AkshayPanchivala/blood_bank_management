import { Box, Grid } from '@mui/material'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BloodStockLoader = () => {
	return (
		<>
			<Box sx={{ width: '100%', border: '1px solid grey', p: 2 }}>
				<Grid
					sx={{ m: 2 }}
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
					<Grid item xs={3}>
						<Skeleton height={25} />
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default BloodStockLoader
