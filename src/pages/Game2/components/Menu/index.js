import React from 'react'

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
