import { getRandomStatus, getCPUMetrics, getMemoryMetrics } from './helpers.js';

const names = ["AD-DevOps","AD-DevOps-Offers","AD-Financial","AD-Financial-Cloud","AD-MovieTickets-Core","AD-Travel","AD-ECommerce","AD-ECommerce-Fullfillment","Movie Tickets Online","Online Retail"];

export const SERVERS = names.map((n, i) => {
	return {
		id: i,
		name: n,
		health: getRandomStatus(),
		metrics: [
			{
				name: 'CPU',
				data: getCPUMetrics()
			},
			{
				name: 'Memory',
				data: getMemoryMetrics()
			}
		]
	}
});