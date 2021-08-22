import React from 'react';
import { getDateTime } from '../../utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserCard = (props) => {
	const { userData, userId } = props;
	return (
		<div className='card mt-4'>
			<div className='card-body'>
				<Link to='/'>
					<i className='fas fa-angle-left me-1'></i>Back to home
				</Link>
				<h4 className='card-title mt-2'>Username: {userId}</h4>
				<p className='card-subtitle mb-2 text-muted mb-2'>
					Created: {getDateTime(userData.created)} | Karma: {userData.karma}
				</p>
			</div>
		</div>
	);
};

UserCard.propTypes = {
	userData: PropTypes.object.isRequired,
	userId: PropTypes.string.isRequired,
};

export default UserCard;
