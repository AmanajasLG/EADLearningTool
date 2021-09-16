import React from "react";
import Button from "../Button";

const Menu = ({ buttonList, onButtonClick }) => {
  const columns = buttonList.length < 3 ? 1 : 3,
    rows = 2;

  return (
    <div id="Menu">
      <div
        id="menu-options"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <span
          style={{
            color: "#FFF",
            backgroundColor: "transparent !important",
            fontSize: "3rem",
          }}
        ></span>
        {Array.from(new Array(rows), (item, index) => index).map(
          (line, index) => (
            <div
              key={index}
              style={{
                flexGrow: 1,
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {buttonList
                .slice(line * columns, columns + line * columns)
                .map((button, index) => (
                  <button
                    style={{
                      // fontSize: "0.6rem",
                      // margin: ".5rem",
                      width: "70%",
                      pointerEvents: button.hasOwnProperty("active")
                        ? button.active
                          ? "auto"
                          : "none"
                        : "auto",
                      opacity: button.hasOwnProperty("active")
                        ? button.active
                          ? 1
                          : 0.3
                        : 1,
                    }}
                    onClick={() => {
                      onButtonClick(button);
                    }}
                  >
                    {button.question}
                  </button>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Menu;
