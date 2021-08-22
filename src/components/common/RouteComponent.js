import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const RouteComponent = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
};

export { RouteComponent };
