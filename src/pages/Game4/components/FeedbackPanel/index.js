import { Button } from "@material-ui/core";
import React from "react";
import { preventSingleWordBreak } from "../../../../_helpers";
import "./index.scss";

const FeedbackPanel = ({ feedback, restart, leave }) => {
  const [state, setState] = React.useState(0);

  return (
    <div>
      <div className="feedback-panel" id="feedback-panel">
        {state > 0 && (
          <span
            className="feedback-arrow feedback-arrow-previous"
            onClick={() => setState(state - 1)}
          >
            {"<"}
          </span>
        )}
        <div className="feedback-panel-content">
          <img
            className="feedback-panel-img"
            src={feedback[state].image}
            alt="feedback-panel-icon"
          />
          <div className="feedback-panel-text">
            <span lang="pt-br">
              {preventSingleWordBreak(feedback[state].message)}
            </span>
            <span
              lang="en"
              className="purple-line-before line-before-margin-30-auto italic"
            >
              {preventSingleWordBreak(feedback[state].messageTranslate)}
            </span>
          </div>
        </div>
        {state < feedback.length - 1 && (
          <span
            className="feedback-arrow feedback-arrow-next"
            onClick={() => setState(state + 1)}
          >
            {">"}
          </span>
        )}
      </div>
      <div id="feedback-endGame-action-btns">
        <Button onClick={restart}>Tentar novamente</Button>
        <Button onClick={leave}>Sair do jogo</Button>
      </div>
    </div>
  );
};

export default FeedbackPanel;
