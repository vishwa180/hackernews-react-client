import React, { Component, Fragment } from 'react';
import { getStories } from '../adapters/stories';
import { Spinner } from '../components/elements';
import Story from '../components/story';

export class Home extends Component {
	state = {
		isLoading: true,
		stories: [],
	};

	componentDidMount = async () => {
		let stories = await getStories();
		this.setState({ stories, isLoading: false });
	};

	render = () => {
		return (
			<Fragment>
				{this.state.isLoading ? (
					<Spinner />
				) : (
					<Fragment>
						{this.state.stories.map((story) => (
							<Story key={story.id} story={story} />
						))}
					</Fragment>
				)}
			</Fragment>
		);
	};
}

export default Home;
