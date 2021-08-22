import { get } from './xhr';

export const getItem = async (id) => {
	try {
		const response = await get(`/item/${id}.json`);
		return response.data;
	} catch (error) {
		console.log('Error while getting a item.');
	}
};

export const getStories = async () => {
	try {
		const { data: storyIds } = await get('/topstories.json');
		const stories = await Promise.all(storyIds.slice(0, 30).map(getItem));
		return stories;
	} catch (error) {
		console.log(error);
	}
};
