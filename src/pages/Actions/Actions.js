import React from 'react';

import WalletLink from 'walletlink';
import Web3 from 'web3';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Delegate from '../../components/SetDelegate/Delegate';
// import Vote from '../../components/Vote/Vote';

import './actions.css';

const StyledButton = withStyles(() => ({
	root: {
		// backgroundColor: 'hotpink',
		color: 'black',
		'&:hover': {
			// backgroundColor: 'hotpink',
		},
	},
}))(Button);

const APP_NAME = 'Minimal Governance';
const APP_LOGO_URL = '';
const CHAIN_ID = 3;

const walletLink = new WalletLink({
	appName: APP_NAME,
	appLogoUrl: APP_LOGO_URL,
	darkMode: false,
});

class Actions extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	loadWeb3 = async () => {
		this.setState({ account: '' });

		const ETH_JSONRPC_URL =
			this.props.network === 'mainnet'
				? process.env.REACT_APP_MAINNET
				: process.env.REACT_APP_ROPSTEN;

		const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);

		const web3 = new Web3(ethereum);

		this.setState({ ethereum, web3 });
	};

	connectAccount = async () => {
		const accounts = await this.state.ethereum.send('eth_requestAccounts');

		this.setState({ account: accounts[0] });
	};

	async componentWillReceiveProps() {
		await this.loadWeb3();
	}

	async componentDidMount() {
		await this.loadWeb3();
	}

	render() {
		return (
			<div className='actions'>
				{this.state.account ? (
					<div className='actions-sub'>
						<Delegate
							web3={this.state.web3}
							account={this.state.account}
						/>
						{/* <Vote /> */}
					</div>
				) : (
					<StyledButton onClick={this.connectAccount}>
						Connect
					</StyledButton>
				)}
			</div>
		);
	}
}

export default Actions;
