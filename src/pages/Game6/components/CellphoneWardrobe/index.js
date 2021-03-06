import React from "react";

import Button from "../../../../_components/Button";
import "./index.scss";

const CellphoneWardrobe = ({ wardrobe, onClothesClick, ...props }) => {
  const [state, setState] = React.useState({
    wardrobeKey: Object.keys(wardrobe)[0],
    page: 0,
  });
  const columns = 2,
    pageSize = 4;

  return (
    <div {...props}>
      <div
        style={{
          height: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "1em",
        }}
      >
        {Object.keys(wardrobe).map((label, index) => (
          <Button
            key={index}
            onClick={() => setState((s) => ({ wardrobeKey: label, page: 0 }))}
            style={{
              borderRadius: "5% 5% 0 0",
              flex: "1 0 0px",
              backgroundColor:
                state.wardrobeKey === label ? "#ffcca9" : "white",
              fontSize: "1.3em",
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        style={{
          height: "6.2rem",
          padding: "2%",
          backgroundColor: "#ffcca9",
          borderRadius: "1%",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#fff7f2",
          }}
        >
          {state.page > 0 && (
            <span
              className="feedback-arrow-phone feedback-arrow-previous"
              onClick={() => setState((s) => ({ ...s, page: s.page - 1 }))}
            >
              {"❮"}
            </span>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {Array.from(new Array(columns), (item, index) => index).map(
              (line, index) => (
                <div
                  key={index}
                  style={{
                    flexGrow: 1,
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-around",
                    backgroundColor: "#fff7f2",
                  }}
                >
                  {wardrobe[state.wardrobeKey]
                    .slice(
                      line * columns + state.page * pageSize,
                      columns + line * columns + state.page * pageSize
                    )
                    .map((item, index) => (
                      <Button
                        style={{
                          fontSize: "0.6rem",
                          margin: ".5rem",
                          width: "50%",
                          pointerEvents: item.picked ? "none" : "auto",
                          opacity: item.picked ? 0.3 : 1,
                        }}
                        onClick={onClothesClick(item)}
                      >
                        {item.name}
                      </Button>
                    ))}
                </div>
              )
            )}
          </div>
          {state.page <
            (wardrobe[state.wardrobeKey].length % pageSize !== 0
              ? Math.floor(wardrobe[state.wardrobeKey].length / pageSize)
              : Math.floor(wardrobe[state.wardrobeKey].length / pageSize) -
                1) && (
            <span
              className="feedback-arrow-phone feedback-arrow-next"
              onClick={() => setState((s) => ({ ...s, page: s.page + 1 }))}
            >
              {"❯"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
/*

*/
export default CellphoneWardrobe;
