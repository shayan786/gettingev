import { getRandomNumber, getRandomDate } from './helpers.js';

const names = ["Default", "Production", "Test Environment", "Weekends"];

export const TEMPLATES = names.map((n, i) => {
	return {
		id: i,
		name: n,
		created_on: getRandomDate(new Date(2018, 0, 1), new Date()),
		rules: getRandomNumber(0, 100, 0),
		applications: getRandomNumber(0, 50, 0),
		users: [
			{
				name: 'Daenerys Targaryen',
				imgURL: '/images/users/danny.png'
			},
			{
				name: 'Eddard Stark',
				imgURL: '/images/users/eddard.jpg'
			}
		]
	}
});