import { getRandomStatus, getCPUMetrics, getMemoryMetrics } from './helpers.js';

const names = ["AD-DevOps MySQL","AD-MovieTickets-Core Azure SQL","Couchbase DevOps-Offers","E-Commerce MySQL","E-Commerce Oracle","MovieTicketsOnline MSSQL","NodeJS MongoDB","Online Retail MySQL","Online Retail MySQL","Online Retail PostgreSQL"];

export const DATABASES = names.map((n, i) => {
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