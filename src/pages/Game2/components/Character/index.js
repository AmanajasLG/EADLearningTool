import React from 'react'
import './character.scss'

const Character = ({character, dragPosition, position, onClick}) => {
    const [pos, setPos] = React.useState({x:0, y:0})
    const [dragging, setDragging] = React.useState(false)

    React.useEffect(()=>{
      if(dragging) setPos(dragPosition)
    }, [dragPosition])

    return (
    <div className="CharDiv" style={pos.x ? {position: 'absolute', left:pos.x, top: pos.y} : null}
      draggable onDragStart={()=>setDragging(true)} onDragEnd={()=>setDragging(false)} onClick={onClick}>
        <img src={character.characterAssets.length > 0 ? character.characterAssets.find(asset => asset.bodyPart === 'fullBody'
													).image[0].url : ""} alt={`${character.name}`}/>
        <div>{character.name}</div>
    </div>
    )
}

export default Character
