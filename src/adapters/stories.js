import { get } from './xhr';

export const getItem = async (id) => {
	try {
		const response = await get(`/item/${id}.json`);
		return response.data;
	} catch (error) {
		console.log('Error while getting a item.');
		return null;
	}
};

export const getTopStoryIds = async () => {
	try {
		const { data: storyIds } = await get('/topstories.json');
		return storyIds;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getStories = async (storyIds) => {
	try {
		// loop through storyIds and get Item data for all ids
		return await Promise.all(storyIds.map(getItem));
	} catch (error) {
		console.log(error);
		return [];
	}
};
