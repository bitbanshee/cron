/**
 * Cron is a Date formatter builder that can transform Date to String based on a provided String format.
 * 
 * The formatter is a function that transforms a Date object (or any string that can instantiate
 * a Date object) to a String that represents it. The returned String is built based on a format
 * String provided to Cron.
 * 
 * The format String can be any String the user wants. To map date/time values, the user must put
 * a '%' before each reserved symbol to make it parseable. The list of symbols and their meanings
 * is presented below:
 * 
 * Time
 * 's': Seconds
 * 'mm': Minutes
 * 'h': Hours (24h)
 * 'H': Hours (a.m./p.m.)
 * 
 * Date
 * 'd': Month day
 * 'D': Weekday name
 * 'Da': Abbreviated weekday name (first 3 digits)
 * 'm': Month (number)
 * 'M': Month name
 * 'Ma': Abbreviated month name (first 3 digits)
 * 'y': Full year
 * 'Y': Last two digits of the year
 * 
 * For example:
 * let timeParser = cron('%d/%m/%Y %h:%mm:%s')
 * let timeString = timeParser(new Date())
 * console.log(timeString); // should log '26/05/17 15:30:00'
 * 
 * @param {String} format 
 */
const cron = function (format = "%Y-%m-%d") {
    if (typeof format != 'string') throw new TypeError('Argument must be a string.')

    const TimeFormatParser = function (format, date) {
		const
			monthNames = [
				'January', 'February', 'March',
				'April', 'May', 'June', 'July',
				'August', 'September', 'October',
				'November', 'December'
			],
			weekdayNames = [
				'Sunday', 'Monday', 'Tuesday',
				'Wednesday', 'Thursday', 'Friday',
				'Saturday'
			],
			parser = {
				's': date => date.getSeconds(),
				'mm': date => date.getMinutes(),
				'h': date => date.getHours(),
				'H': date => {
					let hours = date.getHours();
					if (hours > 11) return hours + ' p.m.';
					return hours + ' a.m.';
				},
				'd': date => ''.concat(date.getDate() < 10 ? '0' : '', date.getDate()),
				'D': date => weekdayNames[date.getDay()],
				'Da': date => weekdayNames[date.getDay()].slice(0, 3),
				'm': date => ''.concat(date.getMonth() < 9 ? '0' : '', date.getMonth() + 1),
				'M': date => monthNames[date.getMonth()],
				'Ma': date => monthNames[date.getMonth()].slice(0, 3),
				'y': date => date.getFullYear(),
				'Y': date => date.getFullYear().toString().slice(-2),
			}
		return parser[format](date).toString()
	}

    return (date = new Date()) => {
        if (typeof date == 'string') date = new Date(date);
        if (date instanceof Date)
            return format.replace(/%([A-Za-z]+)([^A-Za-z%]*)/g, (match, p1, p2) => TimeFormatParser(p1, date).concat(p2))
        throw new TypeError('Argument must be a Date object or a string representing a Date parsed object.')
    }
}