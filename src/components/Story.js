import React from 'react';
import PropTypes from 'prop-types';

const getDateTime = (unixTime) => {
	console.log(unixTime);
	let t = new Date(unixTime);
	return t.toISOString();
};

const Story = ({ story }) => {
	return (
		<div className='card mt-3'>
			<div className='card-body'>
				<h5 className='card-title'>{story.title}</h5>
				<h6 className='card-subtitle mb-2 text-muted'>
					{story.score} points by {story.by} | {getDateTime(story.time)}
				</h6>
				<a href={story.url} target='_blank' rel='noreferrer' className='card-link'>
					Read Story
				</a>
				<a href={story.url} target='_blank' rel='noreferrer' className='card-link'>
					<span>{story.kids?.length} Comments</span>
				</a>
			</div>
		</div>
	);
};

Story.propTypes = {
	story: PropTypes.object.isRequired,
};

export default Story;
