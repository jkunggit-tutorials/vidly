import React from 'react'
const MovieForm = ({match, history}) => {

  const handleSave = () => {
    history.push('/movies')
  }

  return ( 
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button className="btn btn-primary" onClick={()=>{ handleSave() }}>Save</button>
    </div>
   );
}
 
export default MovieForm;