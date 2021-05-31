import React from 'react'
import './index.scss'
import sound from '../../sounds/pwu.mp3'
const Button = ({children, blink, center, onClick, ...props}) => {
  const sfx = new Audio(sound)
  return(
    <button className={`bttn ${blink? 'blink': ''} ${center ? 'center' : '' }`} onClick={onClick} {...props} onPointerEnter={() => sfx.play()}>
      {children}
    </button>
  )
}
export default Button
