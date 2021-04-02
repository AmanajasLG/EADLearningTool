import React from 'react'
import './sala.scss'

const Sala = ({children, roomData, setCurrentChar}) => {

  const img = roomData.location && roomData.location.backgroundAssets.length > 0 ? roomData.location.backgroundAssets[0].image[0].url : ""
  return (
      <div id="sala" style={{backgroundImage: `url("${img}")`}}>
        <div>
          {children}
        </div>
      </div>
  )
}

export default Sala
