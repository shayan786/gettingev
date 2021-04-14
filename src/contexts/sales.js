import React, { Component } from 'react';
import { api } from '../utils/api.js';

const SalesContext = React.createContext();

export class SalesContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sales: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getSales()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getSales () {
		fetch(`${api.url}/sales`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ sales: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { sales, loading, error } = this.state;

		return (
			<SalesContext.Provider 
				value={{
					sales, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</SalesContext.Provider>
		);
	}
}

export const SalesContextConsumer = SalesContext.Consumer;