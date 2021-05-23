import React from 'react'
import './index.scss'
const Button = ({children, blink, onClick, ...props}) => {

  return(
    <button className={`bttn ${blink? 'blink': ''}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
export default Button
