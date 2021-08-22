import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDateTime } from '../utils';
import { getComments } from '../adapters/comments';
import CommentList from './CommentList';
import { Button } from './common';

export class Story extends Component {
	state = {
		comments: null,
	};

	showComments = async () => {
		let comments = await getComments(this.props.story.id);
		this.setState({ comments });
	};

	hideComments = () => {
		this.setState({ comments: null });
	};

	render() {
		const { story, index } = this.props;
		return (
			<div className='card mt-3'>
				<div className='card-body'>
					<h5 className='card-title'>
						{index}. {story.title}
					</h5>
					<p className='card-subtitle mb-2 text-muted mb-2'>
						{story.score} points by{' '}
						<a>
							<i className='fas fa-user'></i> {story.by}
						</a>{' '}
						| <i className='fas fa-calendar me-1'></i> {getDateTime(story.time)}
					</p>
					<div className='pt-2'>
						<Button
							config={{
								label: 'Read Story',
								color: 'primary',
								onClick: () => {
									window.open(story.url, '_blank');
								},
								icon: 'book-open',
							}}
						/>
						<Button
							config={{
								label: 'Show Comments',
								color: 'success',
								onClick: this.showComments,
								icon: 'comments',
								hide: this.state.comments != null,
							}}
						/>
						<Button
							config={{
								label: 'Hide Comments',
								color: 'dark',
								onClick: this.hideComments,
								icon: 'comments',
								hide: this.state.comments == null,
							}}
						/>
					</div>
					{this.state.comments != null && (
						<div className='mt-3'>
							<CommentList comments={this.state.comments} isReplies={false} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

Story.propTypes = {
	story: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

export default Story;
