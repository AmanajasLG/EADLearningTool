import { ButtonConfigs, Iniciar, Voltar } from "../../../../_components/Button";
import React from "react";
import { preventSingleWordBreak } from "../../../../_helpers";
import "./index.scss";

const FeedbackPanel = ({ feedback, restart, leave }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="feedback-panel" id="feedback-panel">
        <div className="feedback-panel-content">
          <div className="feedback-panel-column">
            <div className="feedback-panel-text">
              <span lang="pt-br">{preventSingleWordBreak(feedback.text)}</span>
              <span
                lang="en"
                className="purple-line-before line-before-margin-30-auto italic"
              >
                {preventSingleWordBreak(feedback.textTranslate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="jogo4-end-btns">
        <Voltar
          label={"Tentar novamente"}
          colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_6}
          onClick={restart}
        />
        <Iniciar
          label={"Sair do jogo"}
          colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
          onClick={leave}
        />
      </div>
    </div>
  );
};

export default FeedbackPanel;
