import React from 'react'
import './sala.scss'

const Sala = ({children, roomData, setCurrentChar}) => {

  const [pos, setPos] = React.useState({x: null, y: null})
  const onDragOver = (e) => setPos({x: e.clientX, y: e.clientY})

  const img = roomData.location.backgroundAssets.length > 0 ? roomData.location.backgroundAssets[0].image[0].url : ""
  return (
      <div id="sala" style={{backgroundImage: `url("${img}")`}} onDragOver={onDragOver}>
          {children}
      </div>
  )
}

export default Sala
