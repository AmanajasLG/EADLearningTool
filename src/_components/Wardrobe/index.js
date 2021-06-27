import React from "react";

// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
import Button from "@material-ui/core/Button";

const Wardrobe = ({ wardrobe, onClothesClick, ...props }) => {
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
          rowGap: "10%",
          padding: "5%",
          backgroundColor: "#ffcca9",
        }}
      >
        {wardrobe[state].map((item, index) => (
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
            src={item.image}
            alt={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
