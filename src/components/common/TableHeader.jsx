import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TableHeader extends Component {
  
  // columns: array
  // sortColumn: obj
  // onSort: function
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn }
    if(sortColumn.path === path){
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    }
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)    
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props
    if(column.path !== sortColumn.path) return null
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />
    return <i className="fa fa-sort-desc" />
  }

  render() { 
    return ( 
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th
              className='clickable' 
              key={index} 
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
     );
  }
}
 
TableHeader.propTypes = {
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default TableHeader;