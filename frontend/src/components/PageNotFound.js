import React from 'react'
import pageNotFound from '../image/5203299.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useProtectRoutes from '../hooks/useProtectRoutes'
import { Button } from '@mui/material'

const PageNotFound = () => {
	const navigate = useNavigate()
	const { role } = useSelector((state) => state?.login)
	useProtectRoutes()

	const gobackHandler = () => {
		navigate('/')
	}

	return (
		<>
			{!role && (
				<div className='container'>
					<div className='row mt-5' style={{ height: '100%' }}>
						<div
							className='card mb-3'
							style={{ maxWidth: '100%', maxHeight: '100%' }}
						>
							<div className='row g-0'>
								<div className='col-md-4'>
									<img
										src={pageNotFound}
										className='img-fluid rounded-start'
										alt='Page Not Found'
										width={300}
									/>
								</div>
								<div className='col-md-8'>
									<div className='card-body'>
										<h1 className='card-title text-warning'>
											Oops ! Page Not Found
										</h1>
										<h4 className='card-text'>
											The Page you are trying to access
											does not exist.
										</h4>
										<p>
											Let's go back to the Home page
											instead or if you believe you have
											reached this pageby mistake.
										</p>
									</div>
								</div>
								<div>
									<Button onClick={gobackHandler}>
										Go back
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default PageNotFound
