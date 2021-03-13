import React, { Component } from 'react';

const GlobalFilterContext = React.createContext();

const FILTERS = [
	{
		category: 'GLOBAL FILTER BY'
	},
	{
		category: 'BUSINESS UNIT'
	},
	{
		category: 'DATACENTER'
	},
	{
		category: 'GEOGRAPHIC SALES REGION'
	}
];

export class GlobalFilterContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filters: FILTERS
		}
	}

	render() {
		const { children } = this.props;

		return (
			<GlobalFilterContext.Provider 
				value={{
					filters: this.state.filters
				}}>
				{ children }
			</GlobalFilterContext.Provider>
		);
	}
}

export const GlobalFilterContextConsumer = GlobalFilterContext.Consumer;