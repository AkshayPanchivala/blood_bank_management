import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const useProtectRoutes = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { role } = useSelector((state) => state?.login)

	useEffect(() => {
		if (role === 'BLOODBANK' && location?.pathname.split('/')[1] !== '') {
			navigate('/bloodbank')
		}
		if (role === 'USER' && location?.pathname.split('/')[1] !== '') {
			navigate('/user')
		}
		if (role === 'ADMIN' && location?.pathname.split('/')[1] !== '') {
			navigate('/admin')
		}
	}, [location?.pathname, navigate, role])
}

export default useProtectRoutes
