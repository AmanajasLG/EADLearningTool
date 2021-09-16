import React from "react";
import styles from "./index.module.scss";
import sound from "../../sounds/pwu.mp3";

const BUTTON_DIRECTIONS = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
});

const COLOR_SCHEMES = Object.freeze({
  COR_1: "cor1",
  COR_2: "cor2",
  COR_3: "cor3",
  COR_4: "cor4",
  COR_5: "cor5",
  COR_6: "cor6",
});

const ButtonConfigs = Object.freeze({
  BUTTON_DIRECTIONS,
  COLOR_SCHEMES,
});

const Button = ({
  children,
  blink,
  direction,
  colorScheme,
  onClick,
  stayAsPill,
  showArrow,
  ...props
}) => {
  const sfx = new Audio(sound);

  return (
    <button
      className={`${styles.btn}\
        ${blink ? styles.blink : ""}\
        ${stayAsPill ? styles.stayAsPill : ""}\
        ${styles[direction] ?? ""}\
        ${styles[colorScheme] ?? ""}\
        ${showArrow ? styles.showArrow : ""}`}
      onClick={onClick}
      {...props}
      onPointerEnter={() => sfx.play()}
    >
      {children}
    </button>
  );
};

export default Button;

// Purposefully hiding children because it makes no sense in this context
// It makes more obvious that setting label is through a prop and should be text

const Iniciar = ({ label, onClick, children, ...props }) => (
  <Button
    blink
    colorScheme={COLOR_SCHEMES.COR_1}
    direction={BUTTON_DIRECTIONS.RIGHT}
    onClick={onClick}
    showArrow
    {...props}
  >
    {label ?? "Iniciar"}
  </Button>
);

const Voltar = ({ label, onClick, children, ...props }) => (
  <Button
    blink
    colorScheme={COLOR_SCHEMES.COR_2}
    direction={BUTTON_DIRECTIONS.LEFT}
    onClick={onClick}
    showArrow
    {...props}
  >
    {label ?? "Voltar"}
  </Button>
);

const PularTutorial = ({ label, onClick, children, ...props }) => (
  <Button
    blink
    colorScheme={COLOR_SCHEMES.COR_3}
    direction={BUTTON_DIRECTIONS.RIGHT}
    onClick={onClick}
    showArrow
    stayAsPill
    {...props}
  >
    {label ?? "Pular Tutorial"}
  </Button>
);

const Round = ({ onClick, children, ...props }) => (
  <Button
    blink
    colorScheme={COLOR_SCHEMES.COR_2}
    onClick={onClick}
    stayAsPill
    {...props}
  >
    {children}
  </Button>
);

export { Button, ButtonConfigs, Iniciar, Voltar, PularTutorial, Round };
