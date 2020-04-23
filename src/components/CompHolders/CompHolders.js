import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './compHolders.css';

const StyledTableCell = withStyles((theme) => ({
	root: {
		padding: '10px',
	},
	head: {
		backgroundColor: 'white',
		color: '#fe346e',
		fontFamily: "'Share Tech Mono', monospace",
		fontSize: 13,
	},
	body: {
		fontSize: 13,
		fontFamily: "'Share Tech Mono', monospace",
	},
	// padding: '10px',
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	container: {
		maxHeight: 440,
	},
});

const CompHolders = (props) => {
	const classes = useStyles();

	return (
		<div className='compHolders'>
			<h4>COMP Holders</h4>
			<Paper className={`${classes.root} comp-table`}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								<StyledTableCell>Rank</StyledTableCell>
								{props.network === 'mainnet' ? (
									<StyledTableCell>Name</StyledTableCell>
								) : (
									<StyledTableCell>Address</StyledTableCell>
								)}

								<StyledTableCell>Balance</StyledTableCell>
								<StyledTableCell>Vote Weight</StyledTableCell>
								<StyledTableCell>Votes</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.comp_holders.map((holder, index) => (
								<StyledTableRow key={index}>
									<StyledTableCell>
										{holder.rank}
									</StyledTableCell>
									<StyledTableCell>
										{props.network === 'mainnet'
											? holder.display_name
											: holder.address}
									</StyledTableCell>
									<StyledTableCell>
										{parseFloat(holder.balance).toFixed(0)}
									</StyledTableCell>
									<StyledTableCell>
										{parseFloat(holder.vote_weight).toFixed(
											2
										)}
									</StyledTableCell>
									<StyledTableCell>
										{parseFloat(holder.votes).toFixed(2)}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
};

export default CompHolders;
