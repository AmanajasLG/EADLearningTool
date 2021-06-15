import React from "react";
import { lamp_apagada, lamp_acesa } from "../../img";
import "./index.scss";

const Lamp = ({ onClick, message }) => {
  return (
    <div id="acusar" onClick={onClick}>
      <span>{message}</span>
      <img id="lamp-apagada" src={lamp_apagada} alt=""></img>
      <img id="lamp-acesa" src={lamp_acesa} alt=""></img>
    </div>
  );
};

export default Lamp;
