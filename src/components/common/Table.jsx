import React from 'react'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({ data, columns, sortColumn, onSort }) => {

  return ( 
    <table className='table'>
      <TableHeader 
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody 
        data={data}
        columns={columns}
      />
    </table>      
   );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}

export default Table;
