import React from 'react'
import './character.scss'
import charImage from './pic-char-example.svg'

const Character = ({character, dragPosition, position, setCurrentChar}) => {
    const [pos, setPos] = React.useState({x:0, y:0})
    const [dragging, setDragging] = React.useState(false)

    React.useEffect(()=>{
      if(dragging) setPos(dragPosition)
    }, [dragPosition])
    
    return (
    <div className="CharDiv" style={pos.x ? {position: 'absolute', left:pos.x, top: pos.y} : null}
      draggable onDragStart={()=>setDragging(true)} onDragEnd={()=>setDragging(false)}>
        <div onClick={setCurrentChar(character)}>
          <div>{character.name}</div>
          <img src={character.characterAssets[0].image[0].url} alt={`${character.name}`}/>
        </div>
    </div>
    )
}

export default Character
