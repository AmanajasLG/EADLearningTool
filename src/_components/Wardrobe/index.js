import React from "react";

// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
import Button from "@material-ui/core/Button";
import { Button as CustomButton } from "../Button";

const Wardrobe = ({ wardrobe, onClothesClick, showImage = true, ...props }) => {
  const [state, setState] = React.useState(Object.keys(wardrobe)[0]);
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
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "25% 25% 25% 25%",
          gridTemplateRows: "20% 20% 20%",
          rowGap: "5%",
          padding: "2%",
          backgroundColor: "#ffcca9",
        }}
      >
        {showImage
          ? wardrobe[state].map((item, index) => (
              <img
                key={index}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  margin: "0 auto",
                  display: "block",
                  pointerEvents: item.picked ? "none" : "auto",
                  opacity: item.picked ? 0.3 : 1,
                }}
                onClick={onClothesClick(item)}
                src={
                  item.wardrobeImage !== "" ? item.wardrobeImage : item.image
                }
                alt={item.name}
              />
            ))
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
            ))}
      </div>
    </div>
  );
};

export default Wardrobe;
