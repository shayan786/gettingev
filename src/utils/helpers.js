export function getQuarterlySales (sales) {
	let qSales = [];
	const mapped = sales
		.map(s => { return {
        name: `${s.quarter} - ${s.year}`,
        quantity: parseInt(s.quantity),
        car: `${s.car.manufacturer} - ${s.car.model}`
      }
    })

	const uniqueYears = [...new Set(sales.map(s => s.year))].sort();

	uniqueYears.forEach(year => {
		const uniqueQuarters = [...new Set(sales.filter(s => s.year === year).map(s => s.quarter))].sort()

		uniqueQuarters.forEach(q => {
			const sales = mapped.filter(m => m.name === `${q} - ${year}`);
			let temp = [];
			temp.push({ name: `${q} - ${year}` });
			sales.forEach(s => {
				temp.push({
					[s.car]: s.quantity
				})
			})

			qSales.push(Object.assign({}, ...temp))
		})
	})

	return qSales;
}

export function getUniqueCars (sales) {
	let uniqueCars = [];

	sales.forEach(s => {
		Object.entries(s).forEach(([key, value]) => {
			if (key !== 'time')
				uniqueCars.push(key)
		})
	})

	return [...new Set(uniqueCars)];
}

export function getChargingCurves (data) {
	let temp = [];
	let curveData = [];

	if (data.length > 0) {
		data.forEach(d => {
			d.data.points.forEach(p => {
				temp.push({
					car: `${d.car.manufacturer}_${d.car.model}_${d.car.trim}`,
					[`${d.car.manufacturer}_${d.car.model}_${d.car.trim}`]: p.kw,
					soc: p.soc
				})
			})
		});

		data[0].data.points.forEach(d => {
			let filter = [];
			temp.filter(t => d.soc === t.soc).forEach(t => {
				filter.push(t)
			})
			curveData.push(Object.assign({}, ...filter))
		})
	}

	return curveData;
}

export function getChargingCurve (car, data) {
	let temp = [];
	let curveData = [];

	if (data.length > 0) {
		data.forEach(d => {
			d.data.points.forEach(p => {
				temp.push({
					car: `${car.manufacturer}_${car.model}_${car.trim}`,
					[`${car.manufacturer}_${car.model}_${car.trim}`]: p.kw,
					soc: p.soc
				})
			})
		});

		data[0].data.points.forEach(d => {
			let filter = [];
			temp.filter(t => d.soc === t.soc).forEach(t => {
				filter.push(t)
			})
			curveData.push(Object.assign({}, ...filter))
		})
	}

	return curveData;
}

export const chartColors = [
	'#5A4DAA',
	'#53ABFF',
	'#71DEC0',
	'#FFBF54',
	'#F7729A',
	'#907EFF',
	'#F8A0FF',
	'#00B582',
	'#FFE95F',
	'#BD8D78',
	'#A6A0CE',
	'#A9D4FF',
	'#B8EEDF',
	'#FFDFA9',
	'#FBB8CC',
	'#DED9FF',
	'#FBCFFF',
	'#7FDAC0',
	'#D2F0B8',
	'#DEC6BB',
	'#3B3270',
	'#458ED4',
	'#5DB89F',
	'#D49E45',
	'#CD5E80',
	'#6757D4',
	'#CE85D4',
	'#00966C',
	'#88BA5E',
	'#9B7462'
];