import React, { Component, Fragment } from 'react';
import { getStories, getTopStoryIds } from '../adapters/stories';
import { Spinner } from '../components/common/Spinner';
import { InputField } from '../components/common/InputField';
import Story from '../components/story';

export class TopStories extends Component {
	state = {
		isLoading: true,
		storyIndex: 0,
		storyIds: [],
		stories: [],
		searchText: '',
	};

	componentDidMount = async () =>
		this.setState({ storyIds: await getTopStoryIds() }, () => {
			this.loadStories();
		});

	loadStories = async () => {
		this.setState({ isLoading: true });
		const stories = await getStories(this.state.storyIds.slice(this.state.storyIndex, this.state.storyIndex + 30));
		this.setState({
			stories: [...this.state.stories, ...stories],
			isLoading: false,
			storyIndex: this.state.storyIndex + 30,
		});
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	searchFilter = (story) => {
		const searchRegex = new RegExp(this.state.searchText, 'gi');
		return story.by.match(searchRegex) || story.title.match(searchRegex);
	};

	render = () => {
		return (
			<Fragment>
				<InputField
					config={{ name: 'searchText', placeHolder: 'Search Stories...', value: this.state.searchText, onChange: this.onChange, attributes: { autoComplete: 'off' } }}
				/>

				<div className='mt-2'>
					{this.state.stories.filter(this.searchFilter).map((story, idx) => (
						<Story key={story.id} story={story} index={idx + 1} />
					))}
				</div>

				{this.state.isLoading ? (
					<Spinner />
				) : (
					<div className='text-center mt-3 mb-4'>
						{this.state.storyIndex >= 500 ? (
							<span className='text-muted'>No more top stories.</span>
						) : (
							<button className='btn btn-warning btn-sm' onClick={this.loadStories}>
								Load More <i className='fas fa-chevron-circle-down ms-1'></i>
							</button>
						)}
					</div>
				)}
			</Fragment>
		);
	};
}

export default TopStories;
