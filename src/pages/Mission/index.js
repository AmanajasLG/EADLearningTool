import React from 'react'

const Mission = ({mission}) => {

  return(
    <div>
      <div>Nome: {mission.name}</div>
      <div>
        <div>Descrição:</div>
        <div>{mission.description}</div>
      </div>
    </div>
  )
}

export default Mission
