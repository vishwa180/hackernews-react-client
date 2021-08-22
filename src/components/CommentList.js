import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDateTime, setBtnLoading } from '../utils';
import { getComments } from '../adapters/comments';

class Comment extends Component {
	state = {
		repliesLoading: false,
		replies: null,
	};

	showReplies = async () => {
		this.setState({ repliesLoading: true });
		let replies = await getComments(this.props.comment.id);
		this.setState({ replies, repliesLoading: false });
	};

	hideReplies = () => {
		this.setState({ replies: null });
	};

	render() {
		const { comment } = this.props;
		setBtnLoading(`showReplies-${comment.id}`, this.state.repliesLoading);
		return (
			<Fragment>
				<div className='card bg-light mt-2'>
					<div className='card-body'>
						<h6 className='card-title'>
							{comment.by} | {getDateTime(comment.time)}
						</h6>
						<p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
						{comment.kids && (
							<div className='pt-2'>
								{this.state.replies == null ? (
									<button className='btn btn-sm btn-success ms-2' onClick={this.showReplies} id={`showReplies-${comment.id}`}>
										<i className='fas fa-comments me-1'></i> <span>Show Replies</span>
									</button>
								) : (
									<button className='btn btn-sm btn-dark ms-2' onClick={this.hideReplies}>
										<i className='fas fa-comments me-1'></i> <span>Hide Replies</span>
									</button>
								)}
							</div>
						)}
					</div>
				</div>
				{this.state.replies != null && (
					<div className='mt-3'>
						<CommentList comments={this.state.replies} isReplies={true} />
					</div>
				)}
			</Fragment>
		);
	}
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};

export class CommentList extends Component {
	render() {
		const { comments, isReplies } = this.props;
		return (
			<div className='ms-4 mb-3'>
				<h5>{isReplies ? 'Replies' : 'Comments'}:</h5>
				{comments.length == 0 && <span>No {isReplies ? 'Replies' : 'Comments'} to show.</span>}
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</div>
		);
	}
}

CommentList.propTypes = {
	comments: PropTypes.array.isRequired,
	isReplies: PropTypes.bool.isRequired,
};

export default CommentList;
