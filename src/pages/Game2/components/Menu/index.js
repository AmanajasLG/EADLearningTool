import React from 'react'
import Button from '@material-ui/core/Button'

const Menu = ({buttonList, onButtonClick}) => {
  return(
    <div id='Menu'>
      {buttonList.map( (button,index) =>
        <button key={index} onClick={() => {onButtonClick(button)}}><span>{button.question}</span></button>
        )}
    </div>
  )
}

export default Menu
