import React, { Component } from 'react';
import { getRandomStatus } from '../utils/data/helpers.js';


const UserContext = React.createContext();

const USERS = [
	{
		name: 'Daenerys Targaryen',
		role: 'admin',
		imgURL: '/images/users/danny.png',
		email: 'daenerys.targaryen@got.com',
		notifications: [
			{
				title: 'notification 1',
				description: 'notification description',
				status: getRandomStatus()
			},
			{
				title: 'notification 2',
				description: 'notification description',
				status: getRandomStatus()
			},
			{
				title: 'notification 3',
				description: 'notification description',
				status: getRandomStatus()
			},
			{
				title: 'notification 4',
				description: 'notification description',
				status: getRandomStatus()
			},
			{
				title: 'notification 5',
				description: 'notification description',
				status: getRandomStatus()
			},
			{
				title: 'notification 6',
				description: 'notification description',
				status: getRandomStatus()
			}
		]
	},
	{
		name: 'Eddard Stark',
		role: 'user',
		imgURL: '/images/users/eddard.jpg',
		email: 'eddard.stark@got.com',
		notifications: [
			{
				title: 'notification 1'
			},
			{
				title: 'notification 2'
			},

			{
				title: 'notification 3'
			}
		]
	}
];

export class UserContextProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...USERS[0]
		}
	}

	_toggleUser() {
		this.setState(state => {
			return state.role === "admin"
							? USERS[1]
							: USERS[0]
		})
	}

	render() {
		const { children } = this.props;

		return (
			<UserContext.Provider 
				value={{
					user: this.state,
					toggleUser: () => { this._toggleUser() }
				}}>
				{ children }
			</UserContext.Provider>
		);
	}
}

export const UserContextConsumer = UserContext.Consumer;