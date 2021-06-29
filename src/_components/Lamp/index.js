import React from "react";
import { lamp_apagada, lamp_acesa } from "../../img";
import "./index.scss";

const Lamp = ({ img, onClick, message }) => {
  const icon = [lamp_apagada, lamp_acesa]
  if(img && img[0]) icon[0] = img[0]
  if(img && img[1]) icon[1] = img[1]
  return (
    <div id="acusar" onClick={onClick}>
      <span>{message}</span>
      <img id="lamp-apagada" src={img[0]} alt=""></img>
      <img id="lamp-acesa" src={img[1]} alt=""></img>
    </div>
  );
};

export default Lamp;
