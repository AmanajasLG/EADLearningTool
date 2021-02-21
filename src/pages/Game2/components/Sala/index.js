import React from 'react'
import Character from '../Character'
import './sala.scss'

const Sala = ({roomData, setCurrentChar}) => {

  const [pos, setPos] = React.useState({x: null, y: null})
  const onDragOver = (e) => setPos({x: e.clientX, y: e.clientY})

  //console.log("roomData:", roomData)
  const img = roomData.location.backgroundAssets[0]? roomData.location.backgroundAssets[0].image[0].url : ""
  return (
      <div id="sala" className={roomData.className} style={{backgroundImage: `url("${img}")`}} onDragOver={onDragOver}>
          {roomData.characters.map((character, index) =>
            <Character key={index}
              character={character}
              setCurrentChar={setCurrentChar}
            />
          )}
      </div>
  )
}

export default Sala
