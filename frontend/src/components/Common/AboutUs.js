import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import aboutus from '../../image/aboutus.avif'

const Aboutus = () => {
	return (
		<>
			<Card>
				<CardMedia
					component='img'
					height='300vh'
					image={aboutus}
					alt='green iguana'
					sx={{
						background: 'transparent',
						opacity: '80%',
					}}
				/>
				<CardContent>
					<Typography variant='h6' color='text.secondary'>
						The system manages all the activities from blood
						collection both from camps & hospitals till the issue of
						blood units. It includes donor screening, blood
						collection, mandatory testing, storage and issue of the
						unit (whole human blood IP, different Blood component
						and aphaeresis blood products).
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default Aboutus
