import { getRandomStatus, getRandomDate, getRandomNumber, getRandomPercent, getRandomBoolean } from './helpers.js';

const names = ["Business Transaction error rate is much higher than normal",
							 "Business Transaction response rate is much higher than normal",
							 "CLR Garbage Collection Time is too high",
							 "CPU utilization is too high",
							 "JVM Garbage Collection Time is too high",
							 "JVM Heap utilization is too high",
							 "Memory utilization is too high",
							 "Sign Up Performance is slower than normal"];

export const INCIDENTS = names.map((n, i) => {
	return {
		id: i,
		name: n,
		status: 'Active',
		isOpen: getRandomBoolean(),
		severity: getRandomStatus(),
		start_date: getRandomDate(new Date(2018, 0, 1), new Date()),
		alerts: getRandomNumber(0,20,0),
		anamolies: getRandomNumber(0,20,0),
		violations: getRandomNumber(0,20,0),
		impact: getRandomPercent()
	}
});