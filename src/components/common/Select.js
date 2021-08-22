import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ config: { id, label, name, onChange, value, options, attributes } }) => {
	return (
		<div className='mb-3'>
			{label && <label className='form-label'>{label}</label>}
			<select className='form-select' name={name} id={id} onChange={onChange} value={value} {...attributes}>
				{Object.keys(options).map((opt) => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
};

Select.propTypes = {
	config: PropTypes.object.isRequired,
};

export { Select };
