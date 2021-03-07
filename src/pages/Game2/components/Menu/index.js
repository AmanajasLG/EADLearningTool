import React from 'react'
import Button from '@material-ui/core/Button'

const Menu = ({buttonList, onButtonClick}) => {
  return(
    <div id='Menu'>
      {buttonList.map( (button,index) =>
        <Button key={index} onClick={onButtonClick(button)}>{button.text}</Button>
        )}
    </div>
  )
}

export default Menu
