import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import General from './pages/General/General';
import Actions from './pages/Actions/Actions';

import './App.css';

const THEME = createMuiTheme({
	typography: {
		fontFamily: "'Share Tech Mono', monospace;",
	},
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			mainnet: true,
		};
	}

	handleSlideChange = async () => {
		this.setState({ mainnet: !this.state.mainnet }, () =>
			this.forceUpdate()
		);
	};

	render() {
		return (
			<ThemeProvider theme={THEME}>
				<div className='App'>
					<h2 className='app-title'>Minimal Governance</h2>
					<p id='ropsten'>Ropsten</p>
					<FormControlLabel
						className='switch'
						control={
							<Switch
								checked={this.state.mainnet}
								onChange={this.handleSlideChange}
								name='checkedA'
							/>
						}
						label='Mainnet'
					/>
					<General
						network={this.state.mainnet ? 'mainnet' : 'ropsten'}
					/>
					<Actions
						network={this.state.mainnet ? 'mainnet' : 'ropsten'}
					/>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;
