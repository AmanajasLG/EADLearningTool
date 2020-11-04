import React from 'react'
import Personagem from '../Personagem'
import './sala.css'

const Sala = ({roomData, setCurrentChar}) => {

  const [pos, setPos] = React.useState({x: null, y: null})
  const onDragOver = (e) => setPos({x: e.clientX, y: e.clientY})

  return (
      <div id="sala" className={roomData.colorPalette} onDragOver={onDragOver}>
          {roomData.personagens.map((data, index) =>
            <Personagem key={index}
              dragPosition={pos}
              position={data.metaData.position} charData={data.charData}
              diagData={data.diagData} setCurrentChar={setCurrentChar}
            />
          )}
      </div>
  )
}

export default Sala
