import React from 'react'
import { smallPhone } from '../../img'

const SmallPhone = ({onClick, text, translation, imageUrl, style}) => {
  return(
      <div id="small-cellphone-content" onClick={onClick} style={{...style}}>
        <div id="small-cellphone-floating-text">
          <span lang="pt-br">{text}</span>
          <span lang="default">{translation}</span>
        </div>
        <img src={smallPhone} alt="phone-small" />
        {imageUrl &&
          <img
            src={imageUrl}
            id="cellphone-small-pic"
            alt="cellphone-small-pic"
          />
        }
      </div>
  )
}

export default SmallPhone
