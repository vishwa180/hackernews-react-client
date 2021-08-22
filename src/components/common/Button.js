import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Button = ({ config: { id, label, attributes, color, icon, onClick, hide = false } }) => {
	const [isLoading, setLoading] = useState(false);

	return (
		<button
			className={`btn btn-${color} btn-sm m-1`}
			id={id}
			disabled={isLoading}
			onClick={async () => {
				if (onClick) {
					setLoading(true);
					try {
						await onClick();
					} catch (error) {
						console.log(error);
						alert(error);
					}
					setLoading(false);
				}
			}}
			{...attributes}
			style={{ display: hide ? 'none' : 'inline' }}
		>
			{isLoading && <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>}
			{label}
			{icon && <i className={`fas fa-${icon} ${label ? 'ms-1' : ''}`}></i>}
		</button>
	);
};

Button.propTypes = {
	config: PropTypes.object.isRequired,
};

export { Button };
