import React, { Component, Fragment } from 'react';
import { getStories } from '../adapters/stories';
import { Spinner } from '../components/common/Spinner';
import Story from '../components/story';

export class TopStories extends Component {
	state = {
		isLoading: true,
		stories: [],
		searchText: '',
	};

	componentDidMount = async () => {
		let stories = await getStories();
		this.setState({ stories, isLoading: false });
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	searchFilter = (story) => {
		const searchRegex = new RegExp(this.state.searchText, 'gi');
		return story.by.match(searchRegex) || story.title.match(searchRegex);
	};

	render = () => {
		return (
			<Fragment>
				{this.state.isLoading ? (
					<Spinner />
				) : (
					<Fragment>
						<div className='input-group input-group-navbar mt-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Search Stories...'
								aria-label='Search'
								name='searchText'
								value={this.state.searchText}
								onChange={this.onChange}
								autoComplete={'off'}
							/>
							<button className='btn btn-outline-secondary' type='submit'>
								<i className='fas fa-search'></i>
							</button>
						</div>
						<div className='mt-2'>
							{this.state.stories.filter(this.searchFilter).map((story) => (
								<Story key={story.id} story={story} />
							))}
						</div>
					</Fragment>
				)}
			</Fragment>
		);
	};
}

export default TopStories;
