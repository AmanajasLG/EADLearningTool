import React from 'react'
import styles from './index.module.scss'
import sound from '../../sounds/pwu.mp3'

const BUTTON_DIRECTIONS = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
});

const COLOR_SCHEMES = Object.freeze({
  COR_1: "cor1",
  COR_2: "cor2",
  COR_3: "cor3",
  COR_4: "cor4",
});

const ButtonConfigs = Object.freeze({
  BUTTON_DIRECTIONS,
  COLOR_SCHEMES
});

const Button = ({children, blink, direction, colorScheme, onClick, stayAsPill, showArrow, ...props}) => {

  const sfx = new Audio(sound);

  return(
    <button
      className={
        `${styles.btn}\
        ${blink? styles.blink:''}\
        ${stayAsPill ? styles.stayAsPill:''}\
        ${styles[direction]??''}\
        ${styles[colorScheme]??''}\
        ${showArrow?styles.showArrow:''}`
      }
      onClick={onClick}
      {...props}
      onPointerEnter={() => sfx.play()}
    >
      {children}
    </button>
  )
}

export default Button;

const Iniciar = ({label, onClick}) => <Button
  blink
  colorScheme={COLOR_SCHEMES.COR_1}
  direction={BUTTON_DIRECTIONS.RIGHT}
  onClick={onClick}
  showArrow
>
  {label??"Iniciar"}
</Button>;

const Voltar = ({label, onClick}) => <Button
  blink
  colorScheme={COLOR_SCHEMES.COR_2}
  direction={BUTTON_DIRECTIONS.LEFT}
  onClick={onClick}
  showArrow
>
  {label??"Voltar"}
</Button>;

const PularTutorial = ({label, onClick}) => <Button
  blink
  colorScheme={COLOR_SCHEMES.COR_2}
  direction={BUTTON_DIRECTIONS.RIGHT}
  onClick={onClick}
  showArrow
  stayAsPill
>
  {label??"Pular Tutorial"}
</Button>;

export {Button, ButtonConfigs, Iniciar, Voltar, PularTutorial};
