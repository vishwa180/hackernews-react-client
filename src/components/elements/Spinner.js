import React from 'react';

const Spinner = () => {
	return (
		<div className='container mt-6'>
			<div className='d-flex justify-content-center mt-4'>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	);
};

export { Spinner };
