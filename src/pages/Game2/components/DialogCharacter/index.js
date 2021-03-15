import React from 'react'

const DialogCharacter = ({character, feeling}) => {
  return(
    <div id='CharacterPortrait'>
      {<img src={character.characterAssets.length > 0 ?
        character.characterAssets
        .find(asset =>  asset.bodyPart === 'upperBody' && asset.type === feeling)
        .image[0].url: ""} alt="portrait" />}
</div>
  )
}

export default DialogCharacter
