# Cron

**Cron** is a JS `Date` formatter builder that can transform `Date` to `String` based on a provided `String` format.

The formatter is a `function` that transforms a `Date` object (or any string that can instantiate
a `Date` object) to a `String` that represents it. The returned `String` is built based on a format
`String` provided to **Cron**.

The format `String` can be any `String` the user wants. To map date/time values, the user must put
a *'%'* before each reserved symbol to make it parseable. The list of symbols and their meanings
is presented below:

**Time**
* *'s'*: Seconds
* *'mm'*: Minutes
* *'h'*: Hours (24h)
* *'H'*: Hours (a.m./p.m.)

**Date**
* *'d'*: Month day
* *'D'*: Weekday name
* *'Da'*: Abbreviated weekday name (first 3 digits)
* *'m'*: Month (number)
* *'M'*: Month name
* *'Ma'*: Abbreviated month name (first 3 digits)
* *'y'*: Full year
* *'Y'*: Last two digits of the year

For example:

```javascript
let timeParser = cron('%d/%m/%Y %h:%mm:%s')
let timeString = timeParser(new Date())
console.log(timeString); // should log something like '26/05/17 15:30:00'
```