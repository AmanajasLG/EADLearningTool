import { ButtonConfigs, Iniciar, Voltar } from "../../../../_components/Button";
import React from "react";
import { preventSingleWordBreak } from "../../../../_helpers";
import "./index.scss";

const FeedbackPanel = ({ feedback, restart, leave }) => {
  const [state, setState] = React.useState(0);
  const [showBtns, setShowBtns] = React.useState(false);
  React.useEffect( () => {
    if( state === 3) setShowBtns(true);
  } );

  return (
    <div style={{position:"relative"}}>
      <div className="feedback-panel" id="feedback-panel">
        {state > 0 && (
          <span
            className="feedback-arrow feedback-arrow-previous"
            onClick={() => setState(state - 1)}
          >
            {"❮"}
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
            {"❯"}
          </span>
        )}
      </div>
      {showBtns &&
        <div className="jogo4-end-btns">
          <Voltar label={"Tentar novamente"} colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6} onClick={restart} />
          <Iniciar label={"Sair do jogo"} colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3} onClick={leave} />
        </div>
      }
    </div>
  );
};

export default FeedbackPanel;
