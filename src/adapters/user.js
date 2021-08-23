import { get } from './xhr';
import { getItem } from './stories';

export const getUserData = async (id) => {
	try {
		const { data } = await get(`/user/${id}.json`);

		// if user has submissions, loop through sumbitted ids and get Item data
		if (data.submitted) {
			data['items'] = await Promise.all(data.submitted.slice(0, 50).map(getItem));
		}

		return data;
	} catch (error) {
		console.log('Error while getting a user.');
		return null;
	}
};
