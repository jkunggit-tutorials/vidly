import React from 'react';
const Select = ({
  name,
  value,
  options,
  label,
  nameProperty,
  valueProperty,
  error,
  ...rest
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} className='form-control' {...rest} value={value}>
        <option value='' />
        {options.map((option) => (
          <option key={option[nameProperty]} value={option[nameProperty]}>
            {option[valueProperty]}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  nameProperty: '_id',
  valueProperty: 'name',
};

export default Select;
