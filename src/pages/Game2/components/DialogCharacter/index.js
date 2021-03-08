import React from 'react'

const DialogCharacter = ({character, face}) => {
  return(
    <div id='CharacterPortrait'>
      {<img src={character.characterAssets.length > 0 ?
        character.characterAssets
        .find(asset =>  asset.bodyPart === 'upperBody')
        .image[0].url: ""} alt="portrait" />}
      {<img src={character.characterAssets.length > 0 ?
        character.characterAssets
        .find(asset =>  asset.bodyPart === 'face' && asset.type === face)
        .image[0].url : ""} alt="portrait" />}
</div>
  )
}

export default DialogCharacter
