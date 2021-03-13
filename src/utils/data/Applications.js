import { getRandomPercent, getRandomNumber, getRandomStatus } from './helpers.js';

const names = ["AD-DevOps","AD-DevOps-Offers","AD-Financial","AD-Financial-Cloud","AD-MovieTickets-Core","AD-Travel","AD-ECommerce","AD-ECommerce-Fullfillment","Movie Tickets Online","Online Retail"];

export const APPS = names.map((n, i) => {
	return {
		id: i,
		name: n,
		health: getRandomStatus(),
		calls: getRandomNumber(0, 1000, 2),
		call_per_min: getRandomNumber(0, 100, 2),
		response_time: getRandomNumber(0, 1000, 2),
		error: getRandomPercent(),
		errors: getRandomNumber(0, 1000, 2),
		errors_per_min: getRandomNumber(0, 500, 2),
		location: "#"
	}
});