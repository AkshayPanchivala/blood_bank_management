import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import BloodTypeDropdown from '../../UI/BloodTypeDropdown'
import { getBloodStock, updateStock } from '../../../store/stockSlice'
import BloodStockLoader from '../../UI/BloodStockLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	backgroundColor: '#ed907e',
	fontSize: 20,
	fontWeight: 'bold',
	color: theme.palette.text.secondary,
}))

const BloodStock = () => {
	const dispatch = useDispatch()
	const { stock, isLoading } = useSelector((state) => state?.stock)
	const [open, setOpen] = useState(false)
	const [bloodType, setBloodType] = useState('')
	const [unit, setUnit] = useState(0)
	const [temp, setTemp] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		dispatch(getBloodStock())
	}, [dispatch, temp])

	const handleClose = () => {
		setUnit(0)
		setBloodType('')
		setOpen(false)
	}

	const setBloodtypeDataHandler = (bloodType) => {
		setBloodType(bloodType)
		setError('')
	}

	const onStockChangeHandler = (e) => {
		if (bloodType !== '') {
			if (stock[bloodType] + Number(e.target.value) >= 0) {
				setError('')
				setUnit(e.target.value)
			} else {
				setError('You can not decrease stock more than you have.')
			}
		} else {
			setError('Please select Blood type')
		}
	}

	const addStockHandler = async () => {
		if (bloodType?.length === 0) {
			toast.error('Select blood type')
			return
		}
		if (unit === 0) {
			toast.error('Enter how many unit you can increase or decrease')
			return
		}
		const response = await dispatch(updateStock({ [bloodType]: unit }))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
			setOpen(false)
			setUnit(0)
			setTemp(!temp)
			dispatch(getBloodStock())
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
		}
	}

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item xs={10}>
					<h1 style={{ color: '#ff0000' }}>Donor Requests</h1>
				</Grid>
				<Grid item xs={2}>
					<h1>
						<Button
							variant='contained'
							onClick={() => setOpen(true)}
						>
							Add Stock
						</Button>
					</h1>
				</Grid>
			</Grid>

			{isLoading ? (
				<BloodStockLoader />
			) : (
				<Box sx={{ width: '100%', border: '1px solid grey', p: 2 }}>
					<Grid
						sx={{ m: 2 }}
						container
						rowSpacing={1}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					>
						<Grid item xs={3}>
							<Item>A+ : {stock?.A_Positive}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>A- : {stock?.A_Negative}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>B+ : {stock?.B_Positive}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>B- : {stock?.B_Negative}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>AB+ : {stock?.AB_Positive}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>AB- : {stock?.AB_Negative}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>O+ : {stock?.O_Positive}</Item>
						</Grid>
						<Grid item xs={3}>
							<Item>O- : {stock?.O_Negative}</Item>
						</Grid>
					</Grid>
				</Box>
			)}

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update Stock</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Choose Blood Type and enter amount you want to update
						(if you give positive number it will increase stock else
						decrease stock)
					</DialogContentText>
					<BloodTypeDropdown
						title='Blood Type'
						bloodtypeData={setBloodtypeDataHandler}
					/>

					<TextField
						sx={{ mb: 3, mt: 2 }}
						autoFocus
						required
						fullWidth
						id='unit'
						name='unit'
						label='Unit'
						type='number'
						onChange={onStockChangeHandler}
						value={unit}
					/>
					<div style={{ color: 'red' }}>{error !== '' && error}</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={addStockHandler}>Update Stock</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default BloodStock
