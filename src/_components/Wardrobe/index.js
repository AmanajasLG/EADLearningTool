import React from "react";

import styles from './index.module.scss'
import Button from "../Button";

const Wardrobe = ({ wardrobe, onClothesClick, showImage = true, ...props }) => {
  const [state, setState] = React.useState({label: Object.keys(wardrobe)[0], idx: 0});
  const columns = 3;

  return (
    <div {...props} id={styles["wardrobe"]}>
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
            onClick={() => setState({label: label, idx: index})}
            style={{
              borderRadius: "0.5em 0.5em 0 0",
              flex: "1 0 0px",
              padding: "0.8em 1.8em",
              backgroundColor: "hsl(24, 100%, "+(83+Math.abs(index - state.idx)*5)+"%)",
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
          borderRadius: (state.idx===0?"0":"1")+"% "+(state.idx===3?"0":"1")+"% 1% 1%",
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
            new Array(Math.floor(wardrobe[state.label].length / columns) + 1),
            (item, index) => index
          ).map((line, rowIndex) => (
            <div
              key={(state.idx+1)*10+rowIndex}
              style={{
                flex: "1 1 0px",
                minHeight: 0,
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                margin: "1em",
                backgroundColor: "#fff7f2",
              }}
            >
              {wardrobe[state.label]
                .slice(line * columns, columns + line * columns)
                .map((item, itemIndex) => (
                  <img
                    key={((state.idx+1)*10+rowIndex)*100+itemIndex}
                    style={{
                      cursor: "pointer",
                      pointerEvents: item.picked ? "none" : "auto",
                      opacity: item.picked ? 0.3 : 1,
                      objectFit: "cover",
                      minWidth: 0
                    }}
                    onClick={onClothesClick(item)}
                    src={
                      item.wardrobeImage !== ""
                        ? item.wardrobeImage
                        : item.image
                    }
                    alt=""
                  />
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
