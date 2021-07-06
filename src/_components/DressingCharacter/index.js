import React from "react";

import { shorts, shirt } from "../../img";
import InlineSVG from "../InlineSVG";
import "./index.scss";

const DressingCharacter = ({ character, clothes, onRemoveClick, showRemove, ...props }) => {
  let hasInteiroCover = clothes["Tronco"].reduce((acc, clothing) => {
    return acc || clothing.cover === "inteiro";
  }, false);

  return (
    <div {...props}>
      <InlineSVG
        src={character.image}
        alt="character"
        style={{ height: "100%", position: "absolute" }}
      />
      <InlineSVG
        key={"underware-bottom-" + character.id}
        src={shorts}
        alt={"underware-bottom-" + character.id}
        style={{
          cursor: "pointer",
          position: "absolute",
          height: "100%",
          display:
            clothes["Pernas"].length !== 0
              ? "none"
              : hasInteiroCover
              ? "none"
              : "block",
        }}
      />
      <InlineSVG
        key={"underware-top-" + character.id}
        src={shirt}
        alt={"underware-top-" + character.id}
        style={{
          cursor: "pointer",
          position: "absolute",
          height: "100%",
          display: clothes["Tronco"].length === 0 ? "block" : "none",
        }}
      />
      {Object.keys(clothes).map((label) =>
        clothes[label].map((clothing, index) => (
          <InlineSVG
            key={clothing.id}
            src={clothing.image}
            alt={clothing.name}
            onClick={props.showRemove ? onRemoveClick(clothing) : null}
            style={{
              cursor: "pointer",
              position: "absolute",
              height: "100%",
            }}
          />
        ))
      )}
    </div>
  );
};

export default DressingCharacter;
