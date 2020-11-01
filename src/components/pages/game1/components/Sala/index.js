import React from 'react'
import Personagem from '../Personagem'
import './sala.css'

const Sala = ({roomData, setCurrentChar}) => {

  const [pos, setPos] = React.useState({x: null, y: null})
  const onDragOver = (e) => setPos({x: e.clientX, y: e.clientY})

  return (
      <div id="sala" style={{width:'100%', height:'600px', top: 0}} className={roomData.colorPalette} onDragOver={onDragOver}>
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
