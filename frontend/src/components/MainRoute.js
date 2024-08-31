import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './Layout'
import Login from './Auth/Login'
import UserSignup from './User/UserSignup'
import Home from './Common/Home'
import Aboutus from './Common/AboutUs'
import ContactUs from './Common/ContactUs'
import WantToDonate from './User/WantToDonate/WantToDonate'
import LookingForBlood from './User/LookingForBlood/LookingForBlood'
import PageNotFound from './PageNotFound'
import DonorRequests from '../components/BloodBank/DonorRequests/DonorRequests'
import ReceiveRequests from '../components/BloodBank/ReceiveRequests/ReceiveRequests'
import UserProfile from './User/UserProfile'
import UserHome from './User/UserHome'
import BloodbankHome from './BloodBank/BloodbankHome'
import BloodStock from './BloodBank/BloodSock/BloodStock'
import DonateRequestStatesU from './User/DonateRequestStatesU'
import ReceiveRequestStatesU from './User/ReceiveRequestStatesU'
import DonateRequestStatesB from './BloodBank/DonateRequestStatesB'
import ReceiveRequestStatesB from './BloodBank/ReceiveRequestStatesB'
import AdminHome from './Admin/AdminHome'
import BloodbankList from './Admin/BloodbankList'
import AddBloodbank from './Admin/AddBloodbank'
import ForgotPassword from './Auth/ForgotPassword'
import ResetPassword from './Auth/ResetPassword'

const MainRoute = () => {
	const location = useLocation()
	const { token, role } = useSelector((state) => state?.login)

	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='login/:role' element={<Login />} />
					<Route path='/user/signup' element={<UserSignup />} />
					<Route path='/login/:role' element={<Login />} />
					<Route
						path='/forgotpassword/:role'
						element={<ForgotPassword />}
					/>
					{token !== '' && role !== '' && (
						<>
							{location.pathname.split('/')[1] === 'user' &&
								role === 'USER' && (
									<Route path='/user'>
										<Route path='' element={<UserHome />} />
										<Route
											path='donaterequestsstates'
											element={<DonateRequestStatesU />}
										/>
										<Route
											path='receiverequestsstates'
											element={<ReceiveRequestStatesU />}
										/>
										<Route
											path='wanttodonate'
											element={<WantToDonate />}
										/>
										<Route
											path='lookingfor'
											element={<LookingForBlood />}
										/>
										<Route
											path='aboutus'
											element={<Aboutus />}
										/>
										<Route
											path='profile'
											element={<UserProfile />}
										/>
										<Route
											path='*'
											element={<UserHome />}
										/>
									</Route>
								)}
							{location.pathname.split('/')[1] === 'bloodbank' &&
								role === 'BLOODBANK' && (
									<>
										<Route path='/bloodbank'>
											<Route
												path=''
												element={<BloodbankHome />}
											/>
											<Route
												path='donaterequestsstates'
												element={
													<DonateRequestStatesB />
												}
											/>
											<Route
												path='receiverequestsstates'
												element={
													<ReceiveRequestStatesB />
												}
											/>
											<Route
												path='donorrequests'
												element={<DonorRequests />}
											/>
											<Route
												path='receiverequests'
												element={<ReceiveRequests />}
											/>
											<Route
												path='receiverequests'
												element={<ReceiveRequests />}
											/>
											<Route
												path='stock'
												element={<BloodStock />}
											/>
											<Route
												path='aboutus'
												element={<Aboutus />}
											/>
											<Route
												path='*'
												element={<PageNotFound />}
											/>
										</Route>
									</>
								)}
							{location.pathname.split('/')[1] === 'admin' &&
								role === 'ADMIN' && (
									<Route path='/admin'>
										<Route
											path=''
											element={<AdminHome />}
										/>
										<Route
											path='bloodbanks'
											element={<BloodbankList />}
										/>
										<Route
											path='addbloodbank'
											element={<AddBloodbank />}
										/>
										<Route
											path='aboutus'
											element={<Aboutus />}
										/>
										<Route
											path='*'
											element={<PageNotFound />}
										/>
									</Route>
								)}
						</>
					)}
					<Route exact path='/aboutus' element={<Aboutus />} />
					<Route exact path='/contactUs' element={<ContactUs />} />
					<Route path='*' element={<PageNotFound />} />
				</Route>
				{/* <Route path='/admin/login/:role' element={<Login />} /> */}
				<Route
					path='/resetpassword/:token/:role'
					element={<ResetPassword />}
				/>
			</Routes>
		</>
	)
}

export default MainRoute
