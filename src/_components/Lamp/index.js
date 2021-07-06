import React from "react";
import { lamp_apagada, lamp_acesa } from "../../img";
import "./index.scss";

const Lamp = ({ img, onClick, message, ...props }) => {
  const icon = [lamp_apagada, lamp_acesa]
  if(img){
    if(img[0]) icon[0] = img[0]
    icon[1] = img[1] ? img[1] : img[0]
  }
  return (
    <div id="acusar" onClick={onClick} {...props}>
      <span>{message}</span>
      <img id="lamp-apagada" src={icon[0]} alt=""></img>
      <img id="lamp-acesa" src={icon[1]} alt=""></img>
    </div>
  );
};

export default Lamp;
