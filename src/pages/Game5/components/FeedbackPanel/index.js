import { ButtonConfigs, Iniciar, Voltar } from "../../../../_components/Button";
import React from "react";
import { preventSingleWordBreak } from "../../../../_helpers";
import "./index.scss";

const FeedbackPanel = ({ feedback, won, restart, leave }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="feedback-panel-game-5" id="feedback-panel-game-5">
        <div className="feedback-panel-game-5-content">
          <div
            className="feedback-panel-game-5-column"
            style={{ width: 100 / feedback.length + "%" }}
          >
            {/* <img
              className="feedback-panel-game-5-img"
              src={feedback[0].image}
              alt="feedback-panel-game-5-icon"
            /> */}
            <div className="feedback-panel-game-5-text">
              <span lang="pt-br">
                {preventSingleWordBreak(feedback[0].message)}
              </span>
              <span
                lang="en"
                className="purple-line-before line-before-margin-30-auto italic"
              >
                {preventSingleWordBreak(feedback[0].messageTranslate)}
              </span>
            </div>
          </div>
          <div
            className="feedback-panel-game-5-column"
            style={{ width: 100 / feedback.length + "%" }}
          >
            {/* <img
              className="feedback-panel-game-5-img"
              src={feedback[1].image}
              alt="feedback-panel-game-5-icon"
            /> */}
            <div className="feedback-panel-game-5-text">
              <span lang="pt-br">
                {preventSingleWordBreak(feedback[1].message)}
              </span>
              <span
                lang="en"
                className="purple-line-before line-before-margin-30-auto italic"
              >
                {preventSingleWordBreak(feedback[1].messageTranslate)}
              </span>
            </div>
          </div>
          {!won && (
            <div
              className="feedback-panel-game-5-column"
              style={{ width: 100 / feedback.length + "%" }}
            >
              {/* <img
                className="feedback-panel-game-5-img"
                src={feedback[2].image}
                alt="feedback-panel-game-5-icon"
              /> */}
              <div className="feedback-panel-game-5-text">
                <span lang="pt-br">
                  {preventSingleWordBreak(feedback[2].message)}
                </span>
                <span
                  lang="en"
                  className="purple-line-before line-before-margin-30-auto italic"
                >
                  {preventSingleWordBreak(feedback[2].messageTranslate)}
                </span>
              </div>
            </div>
          )}
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
