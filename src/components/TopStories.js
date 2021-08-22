import React, { Component, Fragment } from 'react';
import { getStories, getTopStoryIds } from '../adapters/stories';
import { Spinner, Button } from './common';
import StoriesList from './StoriesList';

export class TopStories extends Component {
	state = {
		isLoading: true,
		storyIndex: 0,
		storyIds: [],
		stories: [],
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

	render = () => {
		return (
			<Fragment>
				<StoriesList stories={this.state.stories} />
				{this.state.isLoading && <Spinner />}
				<div className='text-center mt-3 mb-4'>
					{this.state.storyIndex >= 500 ? (
						<span className='text-muted'>No more top stories.</span>
					) : (
						<Button
							config={{
								label: 'Load More',
								color: 'warning',
								onClick: this.loadStories,
								icon: 'chevron-circle-down',
								hide: this.state.isLoading,
							}}
						/>
					)}
				</div>
			</Fragment>
		);
	};
}

export default TopStories;
