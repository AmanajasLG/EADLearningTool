import React from 'react'

const DialogCharacter = ({character, feeling}) => {
  let characterImg = ""

  if( !(character == null) ) {
    if( character.characterAssets.length > 0 ) {
      characterImg = character.characterAssets
        .find(asset => asset.bodyPart === 'upperBody' && asset.type === feeling)
        .image.url
    }
  }

  return(
    <div id='CharacterPortrait'>
      {<img src={characterImg} alt="Character Portrait" />}
    </div>
  )
}

export default DialogCharacter
