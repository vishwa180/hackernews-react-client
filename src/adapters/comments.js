import { getItem } from './stories';

export const getComments = async (itemId) => {
	try {
		const { kids } = await getItem(itemId);
		if (kids) {
			const comments = await Promise.all(kids.map(getItem));
			return comments;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};
