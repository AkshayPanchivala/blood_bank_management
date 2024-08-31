import React from 'react'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import InfoIcon from '@mui/icons-material/Info'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '../../store/loginslice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainListItems = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const { role, isLoggedin } = useSelector((state) => state?.login)
	const url = location.pathname.split('/')

	const homeHandler = () => {
		if (role === 'USER') navigate('/user')
		else if (role === 'BLOODBANK') navigate('/bloodbank')
		else if (role === 'ADMIN') navigate('/admin')
		else navigate('/')
	}

	const adminHandler = () => {
		navigate('/login/admin')
	}

	const userHandler = () => {
		navigate('/login/user')
	}

	const bloodbankHandler = () => {
		navigate('/login/bloodbank')
	}

	const wantToDonateHandler = () => {
		navigate('/user/wanttodonate')
	}

	const lookingForBloodHandler = () => {
		navigate('/user/lookingfor')
	}

	const donorrequestsForBloodHandler = () => {
		navigate('/bloodbank/donorrequests')
	}

	const receiverequestsForBloodHandler = () => {
		navigate('/bloodbank/receiverequests')
	}

	const stockHandler = () => {
		navigate('/bloodbank/stock')
	}

	const aboutusHandler = () => {
		if (role === 'USER') navigate('/user/aboutus')
		else if (role === 'BLOODBANK') navigate('/bloodbank/aboutus')
		else if (role === 'ADMIN') navigate('/admin/aboutus')
		else navigate('/aboutus')
	}

	const contactusHandler = () => {
		// if (role === 'USER') navigate('/user/contactus')
		// else if (role === 'BLOODBANK') navigate('/bloodbank/contactus')
		// else if (role === 'ADMIN') navigate('/admin/contactus')
		navigate('/contactus')
	}

	const bloodbankListHandler = () => {
		navigate('/admin/bloodbanks')
	}

	const logoutHandler = async () => {
		dispatch(logout())
		toast.success('Logout successfully.')
		navigate('/')
	}

	return (
		<>
			{!isLoggedin && (
				<>
					<ListItemButton
						onClick={homeHandler}
						selected={url?.length === 2 && url[1] === ''}   
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItemButton>
					<ListItemButton
						onClick={userHandler}
						selected={url[1] === 'user' && url[2] === 'login'}
					>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary='User Login' />
					</ListItemButton>
					<ListItemButton
						onClick={bloodbankHandler}
						selected={url[1] === 'bloodbank' && url[2] === 'login'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Bloodbank Login' />
					</ListItemButton>

					<ListItemButton
						onClick={adminHandler}
						selected={url[1] === 'admin' && url[2] === 'login'}
					>
						<ListItemIcon>
							<AccountCircleIcon />
						</ListItemIcon>
						<ListItemText primary='Admin Login' />
					</ListItemButton>

					<ListItemButton
						onClick={contactusHandler}
						selected={url[1] === 'contactus'}
					>
						<ListItemIcon>
							<ContactsIcon />
						</ListItemIcon>
						<ListItemText primary='Contact us' />
					</ListItemButton>
					<ListItemButton
						onClick={aboutusHandler}
						selected={url[1] === 'aboutus'}
					>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About us' />
					</ListItemButton>
				</>
			)}

			{isLoggedin && role === 'USER' && (
				<>
					<ListItemButton
						onClick={homeHandler}
						selected={url[1] === 'user' && url?.length === 2}
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItemButton>
					<ListItemButton
						onClick={wantToDonateHandler}
						selected={url[2] === 'wanttodonate'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Want to donate' />
					</ListItemButton>
					<ListItemButton
						onClick={lookingForBloodHandler}
						selected={url[2] === 'lookingfor'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Looking for blood' />
					</ListItemButton>
					{/* <ListItemButton
						onClick={contactusHandler}
						selected={url[2] === 'contactus'}
					>
						<ListItemIcon>
							<ContactsIcon />
						</ListItemIcon>
						<ListItemText primary='Contact us' />
					</ListItemButton> */}
					<ListItemButton
						onClick={aboutusHandler}
						selected={url[2] === 'aboutus'}
					>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About us' />
					</ListItemButton>
					<ListItemButton onClick={logoutHandler}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItemButton>
				</>
			)}

			{isLoggedin && role === 'BLOODBANK' && (
				<>
					<ListItemButton
						onClick={homeHandler}
						selected={url[1] === 'bloodbank' && url?.length === 2}
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Home' />
					</ListItemButton>
					<ListItemButton
						onClick={donorrequestsForBloodHandler}
						selected={url[2] === 'donorrequests'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Donor requests' />
					</ListItemButton>
					<ListItemButton
						onClick={receiverequestsForBloodHandler}
						selected={url[2] === 'receiverequests'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Receive requests' />
					</ListItemButton>
					<ListItemButton
						onClick={stockHandler}
						selected={url[2] === 'stock'}
					>
						<ListItemIcon>
							<Inventory2Icon />
						</ListItemIcon>
						<ListItemText primary='Stock' />
					</ListItemButton>
					{/* <ListItemButton
						onClick={contactusHandler}
						selected={url[2] === 'contactus'}
					>
						<ListItemIcon>
							<ContactsIcon />
						</ListItemIcon>
						<ListItemText primary='Contact us' />
					</ListItemButton> */}
					<ListItemButton
						onClick={aboutusHandler}
						selected={url[2] === 'aboutus'}
					>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About us' />
					</ListItemButton>
					<ListItemButton onClick={logoutHandler}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItemButton>
				</>
			)}

			{isLoggedin && role === 'ADMIN' && (
				<>
					<ListItemButton
						onClick={homeHandler}
						selected={url[1] === 'admin' && url?.length === 2}
					>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItemButton>
					<ListItemButton
						onClick={bloodbankListHandler}
						selected={url[1] === 'admin' && url[2] === 'bloodbanks'}
					>
						<ListItemIcon>
							<BloodtypeIcon />
						</ListItemIcon>
						<ListItemText primary='Bloodbanks' />
					</ListItemButton>
					<ListItemButton
						onClick={aboutusHandler}
						selected={url[2] === 'aboutus'}
					>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About us' />
					</ListItemButton>
					<ListItemButton onClick={logoutHandler}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItemButton>
				</>
			)}
		</>
	)
}

export default MainListItems
