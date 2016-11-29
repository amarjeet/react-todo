const moment = require('moment');

console.log(moment().format());

// Jan 1, 1970, 12:00 AM is the start of unix time

const now = moment();
console.log('Current timestamp', now.unix());

const timestamp = 1480411353;
const someMoment = moment.unix(timestamp);

console.log('someMoment', someMoment.format());
console.log('someMoment', someMoment.format('MMM-D-YYYY @ h:ss A'));
console.log('someMoment', someMoment.format('MMMM Mo, YYYY @ h:ss A'));

