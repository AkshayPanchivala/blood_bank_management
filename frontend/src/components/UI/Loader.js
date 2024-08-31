import React from 'react'

const Loader = () => {
	return (
		<div>
			<div className='loader-container'>
				<div className='loader-spinner'>
					<div className='loader-spinner-inner'>
						<div className='loader-spinner-line'></div>
						<div className='loader-spinner-line'></div>
						<div className='loader-spinner-line'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loader
