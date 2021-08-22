import { get } from './xhr';
import { getItem } from './stories';

export const getUserData = async (id) => {
	try {
		const response = await get(`/user/${id}.json`);
		let userData = response.data;
		if (userData.submitted) userData['items'] = await Promise.all(userData.submitted.slice(0, 50).map(getItem));
		return userData;
	} catch (error) {
		console.log('Error while getting a user.');
		return null;
	}
};
