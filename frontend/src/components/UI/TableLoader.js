import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'

const TableLoader = () => {
	return (
		<>
			<TableContainer>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead></TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
							<TableCell>
								<Skeleton height={20} />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default TableLoader
