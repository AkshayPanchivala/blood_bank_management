import React, { useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MainListItems from './MainListItems'
import bgimg from '../../image/background.png'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {
	getBloodbankProfile,
	getUserProfile,
	logout,
} from '../../store/loginslice'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}))

const mdTheme = createTheme()

const Dashboard = (props) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { role, isLoggedin, user, isLoading } = useSelector(
		(state) => state?.login
	)

	const message =
		role === 'USER' && !isLoading
			? `Welcome ${user?.firstName} ${user?.lastName}`
			: role === 'BLOODBANK' && !isLoading
			? `Welcome ${user?.bloodbankName}`
			: role === '' && !isLoading
			? 'Welcome to our Bloodbank domain'
			: ''

	const [open, setOpen] = useState(true)

	useEffect(() => {
		// if (role === 'ADMIN') dispatch();
		if (role === 'BLOODBANK') dispatch(getBloodbankProfile())
		if (role === 'USER') dispatch(getUserProfile())
	}, [dispatch, role])

	const handleCloseUserMenu = (data) => {
		if (data === 'Logout') {
			dispatch(logout())
			navigate('/')
		}
		if (data === 'Profile') {
			if (role === 'USER') navigate('/user/profile')
			if (role === 'BLOODBANK') navigate('/bloodbank/profile')
		}
	}

	return (
		<ThemeProvider theme={mdTheme}>
			<Box
				sx={{
					display: 'flex',
					backgroundImage: `url(${bgimg})`,
					height: '100vh',
					backgroundSize: 'cover',
				}}
			>
				<CssBaseline />
				<AppBar
					position='fixed'
					open={open}
					sx={{ backgroundColor: '#eb4343' }}
				>
					<Toolbar
						sx={{
							pr: '24px',
						}}
					>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={() => setOpen(!open)}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							sx={{ flexGrow: 1, color: 'white' }}
						>
							{message}
						</Typography>
						<Toolbar disableGutters>
							{isLoggedin && (
								<>
									<Box sx={{ flexGrow: 0 }}>
										{role === 'USER' && (
											<Tooltip title='Profile'>
												<IconButton
													onClick={() =>
														handleCloseUserMenu(
															'Profile'
														)
													}
													sx={{ p: 0, mr: 2 }}
												>
													<AccountBoxIcon
														sx={{
															fontSize: '35px',
														}}
													/>
												</IconButton>
											</Tooltip>
										)}

										<Tooltip title='Logout'>
											<IconButton
												onClick={() =>
													handleCloseUserMenu(
														'Logout'
													)
												}
												sx={{ p: 0 }}
											>
												<LogoutIcon
													sx={{ fontSize: '30px' }}
												/>
											</IconButton>
										</Tooltip>
									</Box>
								</>
							)}
						</Toolbar>
					</Toolbar>
				</AppBar>

				<Drawer
					variant='permanent'
					open={open}
					PaperProps={{
						sx: {
							background: 'transparent',
						},
					}}
				>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
							background: 'transition',
						}}
					>
						<Typography
							component='h1'
							variant='h6'
							noWrap
							sx={{ flexGrow: 1, color: 'black' }}
						>
							BLOOD BANK
						</Typography>
						<IconButton onClick={() => setOpen(!open)}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component='nav'>
						<MainListItems />
					</List>
				</Drawer>

				<Box
					component='main'
					sx={{
						flexGrow: 1,
						overflow: 'auto',
					}}
				>
					<Toolbar />
					<Container sx={{ mt: 3 }}>{props?.children}</Container>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default Dashboard
