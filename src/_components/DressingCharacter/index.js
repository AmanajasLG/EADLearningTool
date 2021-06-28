import React from "react";

const DressingCharacter = ({ character, clothes, onRemoveClick, ...props }) => {
  return (
    <div {...props}>
      <img src={character.image} alt="character" style={{ height: "100%" }} />

      {Object.keys(clothes).map((label) =>
        clothes[label].map((clothing, index) => (
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
        ))
      )}
    </div>
  );
};

export default DressingCharacter;
