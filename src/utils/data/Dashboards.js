// import { getRandomStatus, getCPUMetrics, getMemoryMetrics } from './helpers.js';

const names = ["User Journey Dashboard","AWS Instance Dashboard","Business KPI Dashboard","Production Dashbaoard"];

export const DASHBOARDS = names.map((n, i) => {
	return {
		id: i,
		name: n,
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