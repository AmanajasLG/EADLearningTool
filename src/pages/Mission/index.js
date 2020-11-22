import React from 'react'

const Mission = ({mission}) => {
  return(
    <div>
      <div>Nome: {mission.name}</div>
      <div>Descrição: {mission.description}</div>
    </div>
  )
}

export default Mission
