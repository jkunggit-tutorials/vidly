import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

class TableBody extends Component {
  renderCell = (item, column) => {
    if(column.content) 
      return column.content(item)

    return _.get(item, column[this.props.valueProperty])
  }

  render() { 
    const { data, columns } = this.props
    return ( 
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column,index) => (
              <td key={index}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
     );
  }
}
 
TableBody.defaultProps = {
  valueProperty: 'path'
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TableBody;
