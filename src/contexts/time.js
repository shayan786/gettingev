import React, { Component } from 'react';

const TimeContext = React.createContext();

const USERS = [
];

export class TimeContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}

	render() {
		const { children } = this.props;

		return (
			<TimeContext.Provider 
				value={null}>
				{ children }
			</TimeContext.Provider>
		);
	}
}

export const TimeContextConsumer = TimeContext.Consumer;