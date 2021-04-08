
export function getSimpleDate(date: Date): string {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function combineDateAndTime(date: Date, time: Date): string {
    const dateString = getSimpleDate(date);
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    return dateString + 'T' + timeString;
}

export function getDateWithWeekday(date: Date) {

}
