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
              padding: 5,
              cursor: "pointer",
            }}
            onClick={onClick(index)}
          >
            <img src={city.image} alt="" />
            <p>{city.name}</p>
          </div>
        ))}
      {state !== -1 && <button onClick={onConfirm}>Confirmar local</button>}
    </div>
  );
};

export default Cities;
