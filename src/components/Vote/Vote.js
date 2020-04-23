import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './vote.css';

class Vote extends React.Component {
	constructor() {
		super();
		this.state = {
			proposalId: '',
			radioValue: 'for',
		};
	}

	async componentDidMount() {
		const response = await fetch(
			`https://api.compound.finance/api/v2/governance/proposals?network=ropsten&state=active`
		);
		const result = await response.json();

		this.setState({ proposals: result.proposals });
	}

	handleSelectChange = (event) => {
		this.setState({ proposalId: event.target.value });
	};

	handleRadioChange = (event) => {
		this.setState({ radioValue: event.target.value });
	};

	render() {
		return this.state.proposals ? (
			this.state.proposals.length > 0 ? (
				<div className='vote'>
					<FormControl>
						<InputLabel id='demo-simple-select-label'>
							Active Proposals
						</InputLabel>

						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={this.state.proposalId}
							onChange={this.handleSelectChange}
						>
							{this.state.proposals.map((proposal, index) => (
								<MenuItem value={proposal.id}>
									{proposal.title}
								</MenuItem>
							))}
						</Select>

						<FormHelperText>
							Select a proposal to vote for
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel component='legend'>Vote</FormLabel>
						<RadioGroup
							aria-label='vote'
							name='vote'
							value={this.state.radioValue}
							onChange={this.handleRadioChange}
						>
							<FormControlLabel
								value='for'
								control={<Radio />}
								label='For'
							/>
							<FormControlLabel
								value='against'
								control={<Radio />}
								label='Against'
							/>
						</RadioGroup>
					</FormControl>
				</div>
			) : (
				<div style={{ textAlign: 'center' }}>No Active proposals!</div>
			)
		) : null;
	}
}

export default Vote;
