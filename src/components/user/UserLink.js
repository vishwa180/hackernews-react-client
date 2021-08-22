import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserLink = (props) => {
	return (
		<Link className='text-muted' to={`/users/${props.userName}`}>
			<i className='fas fa-user me-1'></i>
			<span>{props.userName}</span>
		</Link>
	);
};

UserLink.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default UserLink;
