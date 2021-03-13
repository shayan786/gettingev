import moment from 'moment';

export const getRandomPercent = () => 
	(Math.random() * 100).toFixed(1);

export const getRandomNumber = (min = 0, max = 1000, roundTo = 2) =>
	(Math.random() * (max - min) + min).toFixed(roundTo);

export const getRandomStatus = () => {
	const prob = getRandomPercent();

	if (prob < 60) {
		return "normal";
	}
	else if (prob > 60 && prob < 80) {
		return "warning";
	}
	else if (prob > 80 && prob < 90) {
		return "verySlow";
	}
	else {
		return "critical"
	}
}

export const getRandomDate = (start, end) =>
	new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getCPUMetrics = () => {
	const duration = 12;
	const start = moment().subtract(duration, 'h');

	let metrics = [];
	let i;

	for (i = 0; i < 12; i++) {
		metrics.push({
			time: start.add(i, 'h').format(),
			cpu: getRandomPercent()
		})
	}

	return metrics;
}

export const getMemoryMetrics = () => {
	const duration = 12;
	const start = moment().subtract(duration, 'h');

	let metrics = [];
	let i;

	for (i = 0; i < 12; i++) {
		metrics.push({
			time: start.add(i, 'h').format(),
			memory: getRandomPercent()
		})
	}

	return metrics;
}

export const getRandomBoolean = () => {
	const prob = getRandomPercent();

	return prob > 50;
}
