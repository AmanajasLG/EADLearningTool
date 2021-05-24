import React from 'react'
import './index.scss'

const DialogCharacter = ({character, feeling, ...props}) => {
  let characterImg = ""

  if( !(character == null) ) {
    if( character.characterAssets.length > 0 ) {
      characterImg = character.characterAssets
        .find(asset => asset.bodyPart === 'upperBody' && asset.type === feeling)
        .image.url
    }
  }

  return(
    <div id='CharacterPortrait' {...props}>
      {<img src={characterImg} alt="Character Portrait" />}
    </div>
  )
}

export default DialogCharacter
