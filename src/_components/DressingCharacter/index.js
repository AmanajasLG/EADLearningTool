import React from "react";

import { shorts, shirt } from "../../img";

const DressingCharacter = ({ character, clothes, onRemoveClick, ...props }) => {
  return (
    <div {...props}>
      <img
        src={character.image}
        alt="character"
        style={{ height: "100%", position: "absolute" }}
      />

      {Object.keys(clothes).map((label) => {
        if (label === "Tronco" && clothes[label].length === 0) {
          return (
            <img
              key="underware-top"
              src={shirt}
              alt="underware-top"
              style={{
                cursor: "pointer",
                pointerEvents: "visiblePainted",
                position: "absolute",
                height: "100%",
              }}
            />
          );
        }

        if (label === "Pernas" && clothes[label].length === 0) {
          return (
            <img
              key="underware-top"
              src={shorts}
              alt="underware-top"
              style={{
                cursor: "pointer",
                pointerEvents: "visiblePainted",
                position: "absolute",
                height: "100%",
              }}
            />
          );
        }

        return clothes[label].map((clothing, index) => (
          <img
            key={clothing.id}
            src={clothing.image}
            alt={clothing.name}
            onClick={props.showRemove ? onRemoveClick(clothing) : null}
            style={{
              cursor: "pointer",
              pointerEvents: "visiblePainted",
              position: "absolute",
              height: "100%",
            }}
          />
        ));
      })}
    </div>
  );
};

export default DressingCharacter;
