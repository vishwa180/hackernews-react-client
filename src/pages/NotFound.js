import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className='mt-4 text-center'>
			<h3>Page not Found.</h3>
			<Link to='/' className='btn btn-primary mt-3'>
				<i className='fas fa-angle-left me-1'></i>Back to home
			</Link>
		</div>
	);
}
