import React, { Component } from 'react';
import { api } from '../utils/api.js';

const ReviewsContext = React.createContext();

export class ReviewsContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reviews: [],
			loading: true,
			error: { state: false, content: {} }
		}
	}

	componentDidMount () {
		this._getReviews()
	}

	_acknowledgeError () {
		this.setState({ error: { state: false }})
	}

	_getReviews () {
		fetch(`${api.url}/reviews`, {
			method: 'GET'
	  }).then(response => {
	    return response.json()
	  }).then(data => {
	  	this.setState({ reviews: data, loading: false });
	  }).catch(error => {
	    this.setState({ error: { state: true, content: error } })
	  }).finally(() => {
	  	this.setState({ loading: false })
	  })
	}

	render() {
		const { children } = this.props;
		const { reviews, loading, error } = this.state;

		return (
			<ReviewsContext.Provider 
				value={{
					reviews, loading, error,
					acknowledgeError: () => { this._acknowledgeError() }
				}}>
				{ children }
			</ReviewsContext.Provider>
		);
	}
}

export const ReviewsContextConsumer = ReviewsContext.Consumer;