import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		console.log(error);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// We could send the error to an error reporting service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>;
		}

		// eslint-disable-next-line react/prop-types
		return this.props.children;
	}
}

export { ErrorBoundary };
