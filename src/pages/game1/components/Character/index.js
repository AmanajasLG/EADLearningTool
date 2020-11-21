import React from 'react'
import './character.scss'
import charImage from './pic-char-example.svg'

const Character = ({dragPosition, position, charData, setCurrentChar}) => {
    const [pos, setPos] = React.useState({x:0, y:0})
    const [dragging, setDragging] = React.useState(false)

    React.useEffect(()=>{
      if(dragging) setPos(dragPosition)
    }, [dragPosition])

    return (
    <div className="CharDiv" style={pos.x ? {position: 'absolute', left:pos.x, top: pos.y} : null}
      draggable onDragStart={()=>setDragging(true)} onDragEnd={()=>setDragging(false)}>
        <div onClick={setCurrentChar(charData)}>
          <div>{charData.nome}</div>
          <img src={charImage} alt="Kimpossible"/>
          {/*
          <div>
            {charData.trabalho}
          </div>
          <div>
            {charData.estadoCivil}
          </div>
          */}
        </div>
    </div>
    )
}

export default Character
