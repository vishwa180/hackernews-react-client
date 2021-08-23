import { getItem } from './stories';

export const getComments = async (itemId) => {
	try {
		// get kids list from Item Data
		const { kids } = await getItem(itemId);

		if (kids) {
			// get Item data for all kids
			const comments = await Promise.all(kids.map(getItem));
			return comments;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
	}
};
