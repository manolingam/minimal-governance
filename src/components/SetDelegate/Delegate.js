import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';

import './delegate.css';
import './loading.css';

const compAddress = '0x1fe16de955718cfab7a44605458ab023838c2793';
const compABI = require('../../abi/COMP.json');

const vertical = 'bottom';
const horizontal = 'right';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const StyledTextField = withStyles((theme) => ({
	root: {
		'& label.Mui-focused': {
			color: 'black',
			fontFamily: "'Share Tech Mono', monospace",
		},
		'& label.Mui-disabled': {
			color: 'black',
			fontFamily: "'Share Tech Mono', monospace",
		},
		width: '100%',
		paddingBottom: '1rem',
		fontFamily: "'Share Tech Mono', monospace",
	},
}))(TextField);

const StyledButton = withStyles(() => ({
	root: {
		// backgroundColor: 'hotpink',
		color: 'black',
		'&:hover': {
			// backgroundColor: 'hotpink',
		},
	},
}))(Button);

class Delegate extends React.Component {
	constructor() {
		super();
		this.state = {
			disabled: true,
			loading: false,
			SnackbarOpen: false,
			txHash: '',
		};
	}

	getCurrentDelegate = async () => {
		const comp = new this.props.web3.eth.Contract(compABI, compAddress);

		let currentDelegate;

		try {
			currentDelegate = await comp.methods
				.delegates(this.props.account)
				.call();
		} catch (e) {
			currentDelegate = 0;
		}

		this.setState({ currentDelegate, comp }, () => this.forceUpdate());
	};

	async componentDidMount() {
		await this.getCurrentDelegate();
	}

	handleSnackBarClose = () => {
		this.setState({ SnackbarOpen: false });
	};

	submitDelegate = async () => {
		this.setState({ disabled: true, loading: true });

		if (this.props.web3.utils.isAddress(this.state.delegateTo)) {
			try {
				const tx = await this.state.comp.methods
					.delegate(this.state.delegateTo)
					.send({ from: this.props.account });
				console.log(tx);
				this.setState(
					{
						delegateTo: '',
						loading: false,
						SnackbarOpen: true,
						txHash: tx.transactionHash,
					},
					() => this.getCurrentDelegate()
				);
			} catch (e) {
				console.error(e);
				this.setState({ delegateTo: '', loading: false });
			}
		} else {
			alert('Not a valid address!');
			this.setState({ delegateTo: '', loading: false });
		}
	};

	render() {
		return (
			<div className='delegate'>
				<h3>Delegation</h3>
				<StyledTextField
					id='standard-read-only-input'
					label='Your address'
					defaultValue={this.props.account}
					disabled={true}
					InputProps={{
						readOnly: true,
					}}
				/>
				<StyledTextField
					id='standard-read-only-input'
					label='Current Delegate'
					disabled={true}
					InputProps={{
						readOnly: true,
						value: this.state.currentDelegate
							? this.state.currentDelegate
							: 'None',
					}}
				/>
				<StyledTextField
					required
					id='standard-required'
					label='New Delegate'
					defaultValue=''
					inputProps={{
						value: this.state.delegateTo,
					}}
					onChange={(event) => {
						if (event.target.value) {
							let delegateTo = event.target.value;
							this.setState({ delegateTo, disabled: false });
						} else {
							let delegateTo = '';
							this.setState({ delegateTo, disabled: true });
						}
					}}
				/>
				{this.state.loading ? (
					<div className='lds-ellipsis'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				) : (
					<StyledButton
						disabled={this.state.disabled}
						onClick={this.submitDelegate}
					>
						Submit
					</StyledButton>
				)}
				<Snackbar
					open={this.state.SnackbarOpen}
					autoHideDuration={4000}
					onClose={this.handleSnackBarClose}
					anchorOrigin={{ vertical, horizontal }}
				>
					<Alert severity='success'>
						{`Transaction Succeeded! (Hash: ${this.state.txHash}`}
					</Alert>
				</Snackbar>
			</div>
		);
	}
}

export default Delegate;
