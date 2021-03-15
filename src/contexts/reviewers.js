import React, { Component } from 'react';
import { api } from '../utils/api.js';

const CarsContext = React.createContext();

export class ReviewersContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reviewers: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getReviewers()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getReviewers () {
		fetch(`${api.url}/reviewers`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ reviewers: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { reviewers, loading, error } = this.state;

		return (
			<ReviewersContext.Provider 
				value={{
					reviewers, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</ReviewersContext.Provider>
		);
	}
}

export const ReviewersContextConsumer = ReviewersContext.Consumer;