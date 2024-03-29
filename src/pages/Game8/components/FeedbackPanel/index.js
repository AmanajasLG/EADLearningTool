import { ButtonConfigs, Iniciar, Voltar } from "../../../../_components/Button";
import React from "react";
import { preventSingleWordBreak } from "../../../../_helpers";
import "./index.scss";

const FeedbackPanel = ({ feedback, won, restart, leave }) => {
  return (
    <div style={{ position: "relative" }}>
      {won ? (
        <div className="won-panel">
          <img
            className="feedback-panel-img-large"
            src={feedback.image}
            alt="feedback-panel-icon"
          />
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
      ) : (
        <div className="feedback-panel" id="feedback-panel">
          <div className="feedback-panel-content">
            {feedback.map((message, index) => (
              <div
                className="feedback-panel-column"
                style={{ width: 100 / feedback.length + "%" }}
              >
                <img
                  className="feedback-panel-img"
                  src={message.image}
                  alt="feedback-panel-icon"
                />
                <div className="feedback-panel-text">
                  <span lang="pt-br">
                    {preventSingleWordBreak(message.text)}
                  </span>
                  <span
                    lang="en"
                    className="purple-line-before line-before-margin-30-auto italic"
                  >
                    {preventSingleWordBreak(message.textTranslate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
