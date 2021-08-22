import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDateTime, setBtnLoading } from '../utils';
import { getComments } from '../adapters/comments';
import CommentList from './CommentList';

export class Story extends Component {
	state = {
		commentsLoading: false,
		comments: null,
	};

	showComments = async () => {
		this.setState({ commentsLoading: true });
		let comments = await getComments(this.props.story.id);
		this.setState({ comments, commentsLoading: false });
	};

	hideComments = () => {
		this.setState({ comments: null });
	};

	render() {
		const { story, index } = this.props;
		setBtnLoading(`showComments-${story.id}`, this.state.commentsLoading);
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
						<a className='btn btn-sm btn-primary' href={story.url} target='_blank' rel='noreferrer'>
							<i className='fas fa-book-open me-1'></i> <span>Read Story</span>
						</a>
						{this.state.comments == null ? (
							<button className='btn btn-sm btn-success ms-2' onClick={this.showComments} id={`showComments-${story.id}`}>
								<i className='fas fa-comments me-1'></i> <span>Show Comments</span>
							</button>
						) : (
							<button className='btn btn-sm btn-dark ms-2' onClick={this.hideComments}>
								<i className='fas fa-comments me-1'></i> <span>Hide Comments</span>
							</button>
						)}
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
