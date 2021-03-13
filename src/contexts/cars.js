import React, { Component } from 'react';
import { api } from '../utils/api.js';

const CarsContext = React.createContext();

export class CarsContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cars: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getCars()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getCars () {
		fetch(`${api.url}/cars`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ cars: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { cars, loading, error } = this.state;

		return (
			<CarsContext.Provider 
				value={{
					cars, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</CarsContext.Provider>
		);
	}
}

export const CarsContextConsumer = CarsContext.Consumer;