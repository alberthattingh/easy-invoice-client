export function getSimpleDate(date: Date): string {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export function getSimpleTime(time: Date): string {
	let d = new Date(time),
		hours = '' + d.getHours(),
		minutes = '' + d.getMinutes();

	if (hours.length < 2) hours = '0' + hours;
	if (minutes.length < 2) minutes = '0' + minutes;

	return hours + ':' + minutes;
}

export function combineDateAndTime(date: Date, time: Date): string {
	const dateString = getSimpleDate(date);
	const timeString = getSimpleTime(time) + ':00';

	return dateString + 'T' + timeString;
}

export function getDateWithWeekday(date: Date) {}
