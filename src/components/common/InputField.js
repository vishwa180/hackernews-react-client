import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ config: { id, label, type, name, onChange, value, placeHolder, attributes } }) => {
	return (
		<div className='mb-3'>
			{label && <label className='form-label'>{label}</label>}
			<input type={type} className='form-control' id={id} name={name} onChange={onChange} value={value} placeholder={placeHolder} {...attributes} />
		</div>
	);
};

InputField.propTypes = {
	config: PropTypes.object.isRequired,
};

export { InputField };
