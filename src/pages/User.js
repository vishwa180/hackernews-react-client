import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getUserData } from '../adapters/user';
import { Spinner } from '../components/common';
import StoriesList from '../components/story/StoriesList';
import UserCard from '../components/user/UserCard';

export class User extends Component {
	state = {
		userData: null,
	};

	static propTypes = {
		match: PropTypes.object.isRequired,
	};

	loadUserData = () => {
		this.setState({ userData: null }, async () => this.setState({ userData: await getUserData(this.props.match.params.id) }));
	};

	componentDidMount = () => this.loadUserData();

	componentDidUpdate = (prevProps) => {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.loadUserData();
		}
	};

	render() {
		const { userData } = this.state;

		return (
			<Fragment>
				{userData ? (
					<Fragment>
						<UserCard userId={this.props.match.params.id} userData={userData} />
						{userData.items && (
							<Fragment>
								<h4 className='mt-4'>Submitted Stories:</h4>
								<StoriesList stories={userData.items.filter((item) => item.type === 'story')} />
							</Fragment>
						)}
					</Fragment>
				) : (
					<Spinner />
				)}
			</Fragment>
		);
	}
}

export default User;
