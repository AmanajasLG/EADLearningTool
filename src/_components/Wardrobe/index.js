import React from "react";

import Button from "../Button";

const Wardrobe = ({ wardrobe, onClothesClick, showImage = true, ...props }) => {
  const [state, setState] = React.useState(Object.keys(wardrobe)[0]);
  const columns = 3
  return (
    <div {...props}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#ffcca9",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(wardrobe).map((label, index) => (
          <Button
            key={index}
            onClick={() => setState(label)}
            style={{
              flex: "1 0 0px",
              backgroundColor: state === label ? "#ffcca9" : "white",
              fontSize: '0.5rem'
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: "2%",
          width: '100%',
          height: '100%',
          backgroundColor: "#ffcca9",
        }}
      >
      { [0, 1, 2].map( (line, index) =>
        <div key={index}
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
            width: '100%', height: '100%', marginTop: '5%', backgroundColor: '#ffddba'}}
        >
          { wardrobe[state]
            .slice(line * wardrobe[state].length/columns, columns + line * wardrobe[state].length/columns)
            .map((item, index) =>
              <div
                key={index}
                style={{
                  width: '10%',
                  overflow: 'hidden',
                  pointerEvents: item.picked ? "none" : "auto",
                  opacity: item.picked ? 0.3 : 1,
                  backgroundColor: '#ffddba',
                }}

              >
                <img style={{cursor: "pointer"}} onClick={onClothesClick(item)}
                  src={item.wardrobeImage !== "" ? item.wardrobeImage : item.image} alt=''/>
              </div>
            )
          }
        </div>
      )}
      </div>
    </div>
  );
};
/*
{ wardrobe[state].slice(value * wardrobe[state].length/columns, columns + value * wardrobe[state].length/columns).map((item, index) => (

<img
  key={index}
  style={{
    cursor: "pointer",
    pointerEvents: item.picked ? "none" : "auto",
    opacity: item.picked ? 0.3 : 1,
    backgroundColor: '#ffddba'
  }}
  onClick={onClothesClick(item)}
  src={
    item.wardrobeImage !== "" ? item.wardrobeImage : item.image
  }
  alt={item.name}
/>
*/
/*
: wardrobe[state].map((item, index) => (
  <CustomButton
    style={{
      pointerEvents: item.picked ? "none" : "auto",
      opacity: item.picked ? 0.3 : 1,
    }}
    key={index}
    onClick={onClothesClick(item)}
  >
    {item.name}
  </CustomButton>
*/
export default Wardrobe;
