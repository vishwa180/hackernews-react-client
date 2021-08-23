import React, { Component, Fragment } from 'react';
import { InputField, Select } from '../common';

import Story from './Story';
import PropTypes from 'prop-types';

// Sort options and the corresponding sort functions
const sortOptions = {
	// eslint-disable-next-line no-unused-vars
	'Default Order': (a, b) => 0,
	'Sort by Points': (a, b) => (a.score > b.score ? -1 : b.score > a.score ? 1 : 0),
	'Newest First': (a, b) => (a.time > b.time ? -1 : b.time > a.time ? 1 : 0),
	'Oldest First': (a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0),
};

export class StoriesList extends Component {
	state = {
		searchText: '',
		sortBy: 'Default Order',
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	searchFilter = (story) => {
		if (story.deleted) return false;
		const searchRegex = new RegExp(this.state.searchText, 'gi');
		return story.by.match(searchRegex) || story.title.match(searchRegex);
	};

	sortStories = (a, b) => sortOptions[this.state.sortBy](a, b);

	render() {
		// filter and sort the stories array as needed
		const stories = this.props.stories.filter(this.searchFilter).sort(this.sortStories);

		return (
			<Fragment>
				<div className='row'>
					<div className='col-md-8'>
						<InputField
							config={{
								name: 'searchText',
								label: 'Search',
								placeHolder: 'Search Stories...',
								value: this.state.searchText,
								onChange: this.onChange,
								attributes: { autoComplete: 'off' },
							}}
						/>
					</div>
					<div className='col-md-4'>
						<Select
							config={{
								name: 'sortBy',
								label: 'Sort Stories',
								value: this.state.sortBy,
								onChange: this.onChange,
								options: sortOptions,
							}}
						/>
					</div>
				</div>

				<div className='mt-2'>
					{stories.map((story, idx) => (
						<Story key={story.id} story={story} index={idx + 1} />
					))}
				</div>
			</Fragment>
		);
	}
}

StoriesList.propTypes = {
	stories: PropTypes.array.isRequired,
};

export default StoriesList;
