import React from 'react'
import PropTypes from 'prop-types'

// our component is raising an onClick event
// we could have named the this.props.onClick to something else we we happen to name it onClick
// note: If you did not raise the onClick on this component, the parent with the onClick props will not get FIRED
const Like = (props) => {
  let classes = 'fa fa-heart'
  if(!props.liked) classes += '-o'
  return ( 
    <i 
      onClick={props.onClick} 
      className={classes}
      style={{ cursor: 'pointer'}} 
      aria-hidden='true'
    /> 
  );
}

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Like;