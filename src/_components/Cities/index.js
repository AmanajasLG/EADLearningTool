import React from "react";

const Cities = ({ value, cities, onPlaceClick, onConfirm }) => {
  const [state, setState] = React.useState(value);
  const onClick = (index) => () => {
    setState(index);
    if (onPlaceClick) onPlaceClick(index);
  };
  return (
    <div style={{ backgroundColor: "#ffffaa" }}>
      {cities &&
        cities.map((city, index) => (
          <div
            key={index}
            style={{
              backgroundColor: index === state ? "#99ddff" : "#ffdd99",
              width: "10%",
              borderRadius: "50%",
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              onClick={onClick(index)}
              src={city.image}
              alt=""
            />
          </div>
        ))}
      {state !== -1 && <button onClick={onConfirm}>Confirmar local</button>}
    </div>
  );
};

export default Cities;
