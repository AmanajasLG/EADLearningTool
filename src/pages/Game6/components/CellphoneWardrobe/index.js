import React from "react";

import Button from "../../../../_components/Button";
import "./index.scss";

const CellphoneWardrobe = ({ wardrobe, startingIdx, onClothesClick, ...props }) => {
  let clampedStartingIdx = Math.min(Math.max(0, startingIdx ?? 0), Object.keys(wardrobe).length-1);
  const [state, setState] = React.useState({
    wardrobeKey: Object.keys(wardrobe)[clampedStartingIdx],
    page: 0,
    idx: clampedStartingIdx
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
          marginTop: "0.5em",
        }}
      >
        {Object.keys(wardrobe).map((label, index) => (
          <Button
            key={index}
            onClick={() => setState((s) => ({ wardrobeKey: label, page: 0, idx: index }))}
            style={{
              borderRadius: "5% 5% 0 0",
              flex: "1 0 0px",
              fontSize: "1.8em",
              padding: "0.7em 0.5em",
              backgroundColor:
                "hsl(24, 100%, " +
                (83 + Math.abs(index - state.idx) * 5) +
                "%)",
            }}
            id="wardrobe-label-button"
          >
            {label}
          </Button>
        ))}
      </div>

      <div
        style={{
          height: "20em",
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
                          fontSize: "2em",
                          margin: "0.5em",
                          width: "50%",
                          height: "3.5em",
                          padding: "0.5em",
                          pointerEvents: item.picked ? "none" : "auto",
                          opacity: item.picked ? 0.3 : 1,
                        }}
                        onClick={onClothesClick(item, state.idx)}
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
