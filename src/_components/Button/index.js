import React from 'react'
import styles from './index.module.scss'
import sound from '../../sounds/pwu.mp3'

const BUTTON_DIRECTIONS = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
});

const COLOR_SCHEMES = Object.freeze({
  SALMON: "main",
  DEEP_BLUE: "accent",
  LIGHT_BLUE: "second",
  LIGHT_GREEN: "third",
  ORANGE: "fourth",
  REDISH: "fifth",
});

const ButtonConfigs = Object.freeze({
  BUTTON_DIRECTIONS,
  COLOR_SCHEMES
});

const Button = ({children, blink, direction, colorScheme, onClick, primary, ...props}) => {

  const sfx = new Audio(sound);

  return(
    <button
      className={`${styles.btn} ${blink? styles.blink: ''} ${styles[direction]} ${styles[COLOR_SCHEMES[colorScheme]]}`}
      onClick={onClick}
      {...props}
      onPointerEnter={() => sfx.play()}
    >
      {children}
    </button>
  )
}

export default Button;
export {Button, ButtonConfigs};
