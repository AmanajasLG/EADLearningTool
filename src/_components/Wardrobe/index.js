import React from "react";

import Button from "../Button";

const Wardrobe = ({ wardrobe, onClothesClick, showImage = true, ...props }) => {
  const [state, setState] = React.useState(Object.keys(wardrobe)[0]);
  const columns = 3;

  return (
    <div {...props}>
      <div
        style={{
          height: "10%",
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
              borderRadius: "5% 5% 0 0",
              flex: "1 0 0px",
              backgroundColor: state === label ? "#ffcca9" : "white",
              fontSize: "3em",
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        style={{
          height: "90%",
          padding: "2%",
          backgroundColor: "#ffcca9",
          borderRadius: "1%",
        }}
      >
        <div
          style={{
            height: "88%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {Array.from(
            new Array(Math.floor(wardrobe[state].length / columns) + 1),
            (item, index) => index
          ).map((line, index) => (
            <div
              key={index}
              style={{
                flexGrow: 1,
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                maxHeight: `${
                  100 / (Math.floor(wardrobe[state].length / columns) + 1) - 3
                }%`,
                backgroundColor: "#fff7f2",
              }}
            >
              {wardrobe[state]
                .slice(line * columns, columns + line * columns)
                .map((item, index) => (
                  <div
                    key={index}
                    style={{
                      maxWidth: "30%",
                      overflow: "hidden",
                      textAlign: "center",
                      pointerEvents: item.picked ? "none" : "auto",
                      opacity: item.picked ? 0.3 : 1,
                    }}
                  >
                    <img
                      className="stretchIn"
                      style={{ cursor: "pointer", height: "100%" }}
                      onClick={onClothesClick(item)}
                      src={
                        item.wardrobeImage !== ""
                          ? item.wardrobeImage
                          : item.image
                      }
                      alt=""
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div
          style={{
            height: "10%",
            margin: "2% 0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "3%",
          }}
        >
          {[0, 1, 2].map((value) => (
            <div
              style={{
                backgroundColor: "#ffbc8f",
                height: "100%",
                flexGrow: 1,
                borderRadius: "8%",
              }}
            >
              <hr
                style={{
                  width: "25%",
                  margin: "12% auto",
                  border: "2px solid white",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
/*

*/
export default Wardrobe;
