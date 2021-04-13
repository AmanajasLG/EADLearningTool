import React from 'react'
import './sala.scss'

const Sala = ({children, roomData, setCurrentChar}) => {

  const img = roomData && roomData.backgroundAssets.length > 0 ? roomData.backgroundAssets[0].image[0].url : ""
  return (
      // <div id="sala" style={{backgroundImage: `url("${img}")`}}>
      <div id="sala">
        <img src={img} alt="" />
        <div id="sala-content">
          {children}
        </div>
      </div>
  )
}

export default Sala
