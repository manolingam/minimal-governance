import React from 'react';

import CompHolders from '../../components/CompHolders/CompHolders';
import Proposals from '../../components/Proposals/Proposals';

import './general.css';

class General extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getAllCompHolders = async () => {
		this.setState({ comp_holders: '' });
		let requestParameters = {
			network: this.props.network,
		};
		requestParameters =
			'?' + new URLSearchParams(requestParameters).toString();

		let response = await fetch(
			`https://api.compound.finance/api/v2/governance/accounts${requestParameters}`
		);
		let result = await response.json();

		this.setState({ comp_holders: result.accounts });
	};

	getAllProposals = async () => {
		let requestParameters = {
			network: this.props.network, // mainnet, ropsten
			page_size: 10, // integer, defaults to 10
		};

		requestParameters =
			'?' + new URLSearchParams(requestParameters).toString();

		const response = await fetch(
			`https://api.compound.finance/api/v2/governance/proposals${requestParameters}`
		);
		const result = await response.json();

		this.setState({ proposals: result.proposals });
	};

	async componentDidMount() {
		await this.getAllCompHolders();
		await this.getAllProposals();
	}

	async componentWillReceiveProps() {
		await this.getAllCompHolders();
		await this.getAllProposals();
	}

	render() {
		return (
			<div className='general'>
				{this.state.comp_holders ? (
					<CompHolders
						comp_holders={this.state.comp_holders}
						network={this.props.network}
					/>
				) : null}
				{this.state.proposals ? (
					<Proposals proposals={this.state.proposals} />
				) : null}
			</div>
		);
	}
}

export default General;
