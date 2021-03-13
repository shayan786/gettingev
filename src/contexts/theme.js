import React, { Component } from 'react';

const ThemeContext = React.createContext();

export class ThemeContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: 'dark'
		}
	}

	_toggleTheme() {
		this.setState(state => ({
			current: state.current === 'dark'
				? 'light'
				: 'dark'
			})
		);
	}

	render() {
		const { children } = this.props;

		return (
			<ThemeContext.Provider 
				value={{
					current: this.state.current,
					toggleTheme: this._toggleTheme.bind(this)
				}}>
				{ children }
			</ThemeContext.Provider>
		);
	}
}

export const ThemeContextConsumer = ThemeContext.Consumer;