import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import './proposals.css';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		color: '#fe346e',
		fontFamily: "'Share Tech Mono', monospace",
		fontSize: 15,
		flexShrink: 0,
	},
	yes: {
		color: '#00d395',
		fontFamily: "'Share Tech Mono', monospace",
		fontSize: 10,
	},
	no: {
		color: '#fe346e',
		fontFamily: "'Share Tech Mono', monospace",
		fontSize: 10,
	},
	description: {
		fontFamily: "'Share Tech Mono', monospace",
		fontSize: 13,
	},
}));

const Proposals = (props) => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return props.proposals.length > 0 ? (
		<div className={`${classes.root} proposals`}>
			<h4>Proposals</h4>
			<div className='proposals-panel'>
				{props.proposals.map((proposal, index) => (
					<ExpansionPanel
						key={index}
						expanded={expanded === index}
						onChange={handleChange(index)}
					>
						<ExpansionPanelSummary
							aria-controls='panel1bh-content'
							id='panel1bh-header'
						>
							<Typography className={classes.heading}>
								{proposal.title}
							</Typography>
							<div className='votes'>
								<Typography className={classes.yes}>
									<span role='img' aria-label=''>
										👍
									</span>{' '}
									{parseFloat(proposal.for_votes).toFixed(0)}
								</Typography>
								<Typography className={classes.no}>
									<span role='img' aria-label=''>
										👎
									</span>{' '}
									{parseFloat(proposal.against_votes).toFixed(
										0
									)}
								</Typography>
							</div>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography className={classes.description}>
								{proposal.description}
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
			</div>
		</div>
	) : (
		<div className='proposals-not-found'>
			<h3>No proposals found in this network!</h3>
		</div>
	);
};

export default Proposals;
