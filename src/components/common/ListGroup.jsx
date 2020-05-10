import React from 'react'
const ListGroup = (props) => {
  // pass in the textProperty, valueProperty to make it more flexible for reuse
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props

  return ( 
    <ul className="list-group">
      {items.map(item => (
        <li 
          key={item[valueProperty]} 
          className={ item === selectedItem ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
      ))}
    </ul>
   )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}
 
export default ListGroup;
