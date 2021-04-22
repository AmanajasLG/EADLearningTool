import React from 'react'

const Menu = ({ buttonList, onButtonClick }) => {
  return (
    <div id='Menu'>
      <div id="menu-options">
        {buttonList.map((button, index) =>
          <button key={index} onClick={() => { onButtonClick(button) }} disabled={button.hasOwnProperty('active') ? !button.active : false}><span>{button.question}</span></button>
        )}
      </div>
    </div>
  )
}

export default Menu
