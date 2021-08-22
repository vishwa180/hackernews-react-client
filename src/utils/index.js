const getDateString = (date) => {
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

const getTimeString = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return hours + ':' + minutes + ' ' + ampm;
};

export const getDateTime = (unixTime) => {
	let date = new Date(unixTime * 1000);
	return getDateString(date) + ' ' + getTimeString(date);
};
