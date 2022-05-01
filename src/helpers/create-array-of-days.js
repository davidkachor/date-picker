import {DateTime} from "luxon/build/es6/luxon";

const createArrayOfDays = date => {
	const firstDay = DateTime.fromISO(date).weekday
	return Array.from(Array(42), (e, i) => {
		if (i >= firstDay - 1 && DateTime
			.fromISO(date + '-' + ((i - firstDay + 2) < 10 ? `0${i - firstDay + 2}` : i - firstDay + 2))
			.c) {
			return i - firstDay + 2
		} else return ''
	})
}

export default createArrayOfDays
