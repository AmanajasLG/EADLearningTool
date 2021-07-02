import React from "react";

import Button from "../Button";

const Wardrobe = ({ wardrobe, onClothesClick, showImage = true, ...props }) => {
  const [state, setState] = React.useState(Object.keys(wardrobe)[0]);
  const columns = 3
  return (
    <div {...props}>
      <div
        style={{
          height: '10%',
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(wardrobe).map((label, index) => (
          <Button
            key={index}
            onClick={() => setState(label)}
            style={{
              borderRadius: '10% 10% 0 0',
              flex: "1 0 0px",
              backgroundColor: state === label ? "#ffcca9" : "white",
              fontSize: '1rem'
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        style={{
          height: '90%',
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: "2%",
          backgroundColor: "#ffcca9",
        }}
      >
      { Array.from(new Array(Math.floor(wardrobe[state].length/columns) + 1), (item, index) => index)
        .map( (line, index) =>
        <div key={index}
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
            height: '28%', marginTop: '5%', backgroundColor: '#ffddba'}}
        >
          { wardrobe[state]
            .slice(line * columns, columns + line * columns)
            .map((item, index) =>
              <div
                key={index}
                style={{
                  overflow: 'hidden',
                  pointerEvents: item.picked ? "none" : "auto",
                  opacity: item.picked ? 0.3 : 1,
                  backgroundColor: '#ffddba',
                }}

              >
                <img style={{cursor: "pointer", height: '100%'}} onClick={onClothesClick(item)}
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

*/
export default Wardrobe;
