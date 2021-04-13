import React from 'react'
import './character.scss'

const Character = ({zDepth, character, dragPosition, position, onClick, showNameOnHover}) => {
    return (
    <div className="CharDiv" onClick={onClick} style={{"--z": zDepth}}>
        <img src={character.characterAssets.length > 0 ? character.characterAssets.find(asset => asset.bodyPart === 'fullbody'
													).image[0].url : ""} alt={`${character.name}`}/>
        {showNameOnHover && <div>{character.name}</div>}
    </div>
    )
}

export default Character
