import { get } from './xhr';

const getStory = async (id) => {
	try {
		const story = await get(`/item/${id}.json`);
		return story;
	} catch (error) {
		console.log('Error while getting a story.');
	}
};

const getStories = async () => {
	try {
		const { data: storyIds } = await get('/topstories.json');
		const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));
		return stories.map((story) => story.data);
	} catch (error) {
		console.log(error);
	}
};

export { getStories, getStory };
