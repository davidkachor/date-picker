export const monthsList = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const createArrayOfDays = date => {
	// '2022-04' date format
	const firstDay = new Date(date).getDay()
	const month = new Date(date).getMonth()
	return Array.from(Array(42), (e, i) => i < firstDay ? '' : i - firstDay + 1).map(e => {
		if (
			!isNaN(new Date(date + '-' + (e)).getDay()) &&
			new Date(date + '-' + (e)).getMonth() === month &&
			e
		) {
			return e
		} else {
			return ''
		}
	})
}
