import React, { Component } from 'react';
import { api } from '../utils/api.js';

const ChargingCurvesContext = React.createContext();

export class ChargingCurvesContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chargingCurves: [],
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
		fetch(`${api.url}/charging-curves`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ chargingCurves: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { chargingCurves, loading, error } = this.state;

		return (
			<ChargingCurvesContext.Provider 
				value={{
					chargingCurves, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</ChargingCurvesContext.Provider>
		);
	}
}

export const ChargingCurvesContextConsumer = ChargingCurvesContext.Consumer;