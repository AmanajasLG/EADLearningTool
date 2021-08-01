import React from "react";
import { Iniciar } from '../Button'

const Cities = ({ value, cities, onPlaceClick, onConfirm }) => {
  const [state, setState] = React.useState(value);
  const onClick = (index) => () => {
    setState(index);
    if (onPlaceClick) onPlaceClick(index);
  };
  return (
    <React.Fragment>
      <p style={{textAlign: 'center', marginTop: '2%'}}><strong>Selecione o destino ideal:</strong></p>
      <div style={{ backgroundColor: "#EEEEEE",
        display: 'flex',
        flexDirection: 'row',
        padding: '3%',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {cities &&
          cities.map((city, index) => (
            <div
              key={index}
              style={{
                backgroundColor: index === state ? "#f9afa1" : "#59316d",
                borderTop: index === state? '4px solid #f9afa1' : 'none',
                borderRight: index === state? '4px solid #f9afa1' : 'none',
                borderLeft: index === state? '4px solid #f9afa1' : 'none',
                cursor: "pointer",
                width: '30%',
                margin: '1%',
                borderRadius: '8%/12%',
                overflow: 'hidden',
              }}
              onClick={onClick(index)}
            >
                <img src={city.image} alt="" />
                <p style={{display: 'block', textAlign: 'center', color: 'white'}}>{city.name}</p>
            </div>
          ))}
      </div>
      {state !== -1 && <Iniciar onClick={onConfirm} label='Confirmar Local' style={{position: 'absolute', right: '5%', bottom: '-2.5%', fontSize: '0.8rem'}}></Iniciar>}
    </React.Fragment>
  );
};

export default Cities;
