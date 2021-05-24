import React from 'react'
import './index.scss'
const Button = ({children, blink, center, onClick, ...props}) => {

  return(
    <button className={`bttn ${blink? 'blink': ''} ${center ? 'center' : '' }`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
export default Button
