import Axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

function returnAxiosInstance() {
	return Axios.create({ headers: {}, baseURL: baseURL });
}

export function get(url) {
	const axios = returnAxiosInstance();
	return axios.get(url);
}

export function post(url, requestData) {
	const axios = returnAxiosInstance();
	return axios.post(url, requestData);
}
