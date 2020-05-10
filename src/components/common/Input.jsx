import React from 'react';
const Input = ({ name, label, value, onChange }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        id={name}
        name={name}
        type='text'
        className='form-control'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
