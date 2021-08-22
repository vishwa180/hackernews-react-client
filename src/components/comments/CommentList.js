import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getDateTime } from '../../utils';
import { getComments } from '../../adapters/comments';
import { Button } from '../common';
import UserLink from '../user/UserLink';

class Comment extends Component {
	state = {
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
		return (
			<Fragment>
				<div className='card bg-light mt-2'>
					<div className='card-body'>
						<h6 className='card-title'>
							<UserLink userName={comment.by} /> | {getDateTime(comment.time)}
						</h6>
						<p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
						{comment.kids && (
							<div className='pt-2'>
								<Button
									config={{
										label: 'Show Replies',
										color: 'success',
										onClick: this.showReplies,
										icon: 'comments',
										hide: this.state.replies != null,
									}}
								/>
								<Button
									config={{
										label: 'Hide Replies',
										color: 'dark',
										onClick: this.hideReplies,
										icon: 'comments',
										hide: this.state.replies == null,
									}}
								/>
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

const CommentList = (props) => {
	const { comments, isReplies } = props;
	return (
		<div className='ms-4 mb-3'>
			<h5>{isReplies ? 'Replies' : 'Comments'}:</h5>
			{comments.length == 0 && <span>No {isReplies ? 'Replies' : 'Comments'} to show.</span>}
			{comments
				.filter((comment) => !comment.deleted)
				.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
		</div>
	);
};

CommentList.propTypes = {
	comments: PropTypes.array.isRequired,
	isReplies: PropTypes.bool.isRequired,
};

export default CommentList;
