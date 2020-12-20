import React from 'react'
import Character from '../Character'
import './sala.scss'

const Sala = ({roomData, setCurrentChar}) => {

  const [pos, setPos] = React.useState({x: null, y: null})
  const onDragOver = (e) => setPos({x: e.clientX, y: e.clientY})

  return (
      <div id="sala" className={roomData.className} onDragOver={onDragOver}>
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
