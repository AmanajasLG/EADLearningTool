import React from "react";

import Button from "../../../../_components/Button";
import "./index.scss";

const ColorPanel = ({ colors, onColorClick, ...props }) => {
  const [state, setState] = React.useState(0);
  const columns = 2,
    rows = 3,
    pageSize = 6;

  return (
    <div {...props}>
      <div className="grid-wrapper">
        <div className="grid-background">
          {state > 0 && (
            <span
              className="feedback-arrow-phone feedback-arrow-previous"
              onClick={() => setState((s) => s - 1)}
            >
              {"❮"}
            </span>
          )}
          <div className="grid-content-wrapper">
            {Array.from(new Array(rows), (item, index) => index).map(
              (line, index) => (
                <div key={index} className="grid-content-row">
                  {colors
                    .slice(
                      line * columns + state * pageSize,
                      columns + line * columns + state * pageSize
                    )
                    .map((color, index) => (
                      <Button
                        style={{
                          fontSize: "0.6rem",
                          margin: ".5rem",
                          width: "30%",
                        }}
                        onClick={onColorClick(color)}
                      >
                        {color}
                      </Button>
                    ))}
                </div>
              )
            )}
          </div>
          {state <
            (colors.length % pageSize !== 0
              ? Math.floor(colors.length / pageSize)
              : Math.floor(colors.length / pageSize) - 1) && (
            <span
              className="feedback-arrow-phone feedback-arrow-next"
              onClick={() => setState((s) => s + 1)}
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
export default ColorPanel;
