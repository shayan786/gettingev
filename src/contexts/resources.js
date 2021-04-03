import React, { Component } from 'react';
import { api } from '../utils/api.js';

const ResourcesContext = React.createContext();

export class ResourcesContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resources: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getResources()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getResources () {
		fetch(`${api.url}/resources`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ resources: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { resources, loading, error } = this.state;

		return (
			<ResourcesContext.Provider 
				value={{
					resources, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</ResourcesContext.Provider>
		);
	}
}

export const ResourcesContextConsumer = ResourcesContext.Consumer;