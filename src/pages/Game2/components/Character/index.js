import React from 'react'
import './character.scss'

const Character = ({zDepth, character, dragPosition, position, onClick}) => {
    // const [pos, setPos] = React.useState({x:0, y:0})
    // const [dragging, setDragging] = React.useState(false)

    // React.useEffect(()=>{
    //   if(dragging) setPos(dragPosition)
    // }, [dragging, dragPosition])

    // return (
    // <div className="CharDiv" style={pos.x ? {position: 'absolute', left:pos.x, top: pos.y} : null}
    //   draggable onDragStart={()=>setDragging(true)} onDragEnd={()=>setDragging(false)} onClick={onClick}>
    //     <img src={character.characterAssets.length > 0 ? character.characterAssets.find(asset => asset.bodyPart === 'fullbody'
		// 											).image[0].url : ""} alt={`${character.name}`}/>
    //     <div>{character.name}</div>
    // </div>
    // )

    return (
    <div className="CharDiv" onClick={onClick} style={{"--z": zDepth}}>
        <img src={character.characterAssets.length > 0 ? character.characterAssets.find(asset => asset.bodyPart === 'fullbody'
													).image[0].url : ""} alt={`${character.name}`}/>
        <div>{character.name}</div>
    </div>
    )
}

export default Character
