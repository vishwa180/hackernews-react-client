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

export const setBtnLoading = (btnId, isLoading) => {
	console.log(btnId);
	let btn = document.getElementById(btnId);

	if (btn) {
		if (btn.disabled === isLoading) {
			return;
		}

		btn.disabled = isLoading;
		if (isLoading) {
			btn.insertAdjacentHTML('afterbegin', `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>`);
		} else {
			let spinners = btn.getElementsByClassName('spinner-border');
			for (let spinner of spinners) {
				spinner.parentNode.removeChild(spinner);
			}
		}
	}
};
