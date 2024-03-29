import React from "react";
import "./index.scss";

const DialogHistory = ({ dialogHistory }) => {
  return (
    <div id="dialog-history-wrapper">
      <div id="dialog-history-content">
        {[...dialogHistory].reverse().map((dialog, index) => (
          <div
            className={
              "mensagem" +
              (dialog.speaker === "player" ? 0 : 1) +
              (index === 0
                ? " animate-mensagem" + (dialog.speaker === "player" ? 0 : 1)
                : "")
            }
            key={index}
          >
            {dialog.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogHistory;
