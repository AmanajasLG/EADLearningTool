import React from "react";
import { Iniciar } from "../Button";
import styles from "./index.module.scss";

const Cities = ({ value, cities, onPlaceClick, onConfirm }) => {
  const [state, setState] = React.useState(value);
  const onClick = (index) => () => {
    setState(index);
    if (onPlaceClick) onPlaceClick(index);
  };
  return (
    <React.Fragment>
      <p style={{ textAlign: "center", marginTop: "2%" }}>
        <strong>Selecione o destino ideal:</strong>
      </p>
      <div
        style={{
          backgroundColor: "#EEEEEE",
          display: "flex",
          flexDirection: "row",
          padding: "3%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {cities &&
          cities.map((city, index) => (
            <div
              className={styles["cityCard"]}
              id={city === state ? styles["selected"] : null}
              key={index}
              onClick={onClick(city)}
            >
              <img src={city.image} alt="" />
              <p>{city.name}</p>
            </div>
          ))}
      </div>
      {state !== -1 && (
        <Iniciar
          onClick={onConfirm}
          label="Confirmar Local"
          style={{
            position: "absolute",
            right: "5%",
            bottom: "-2.5%",
            fontSize: "0.7em",
          }}
        ></Iniciar>
      )}
    </React.Fragment>
  );
};

export default Cities;
