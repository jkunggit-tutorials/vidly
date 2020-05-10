import React from 'react';
const Search = ({ value, onSearch }) => {
  return (
    <input
      onChange={(e) => onSearch(e)}
      placeholder='Search...'
      className='form-control my-3'
      value={value}
    />
  );
};

export default Search;
