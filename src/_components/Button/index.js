import React from 'react'
import styles from './index.module.scss'
import sound from '../../sounds/pwu.mp3'

const BUTTON_DIRECTIONS = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
});

const Button = ({children, blink, direction, onClick, primary, ...props}) => {

  const sfx = new Audio(sound);

  return(
    <button className={`${styles.btn} ${blink? styles.blink: ''} ${styles[direction]}`} onClick={onClick} {...props} onPointerEnter={() => sfx.play()}>
      {children}
    </button>
  )
}

export default Button;
export {Button, BUTTON_DIRECTIONS};
