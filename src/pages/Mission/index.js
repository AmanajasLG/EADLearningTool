import React from 'react'

const Mission = ({mission}) => {

  return(
    <div class="mission">
      <h2 class="mission-name">Nome: {mission.name}</h2>
      <h3 class="mission-desc">Descrição: {mission.description}</h3>
    </div>
  )
}

export default Mission
