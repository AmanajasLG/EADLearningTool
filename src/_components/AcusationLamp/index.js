import React from "react";
import { lamp_apagada, lamp_acesa } from "../../img";
import "./index.scss";

const AcusationLamp = ({ onClick }) => {
  return (
    <div id="acusar" onClick={onClick}>
      <span>É você!</span>
      <img id="lamp-apagada" src={lamp_apagada} alt=""></img>
      <img id="lamp-acesa" src={lamp_acesa} alt=""></img>
    </div>
  );
};

export default AcusationLamp;
