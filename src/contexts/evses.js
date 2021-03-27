import React, { Component } from 'react';
import { api } from '../utils/api.js';

const EvsesContext = React.createContext();

export class EvsesContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			evses: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getEvses()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getEvses () {
		fetch(`${api.url}/evses`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ evses: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { evses, loading, error } = this.state;

		return (
			<EvsesContext.Provider 
				value={{
					evses, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</EvsesContext.Provider>
		);
	}
}

export const EvsesContextConsumer = EvsesContext.Consumer;