import React from "react";

import {
  smallPhoneBlank as smallPhone,
  bigPhone,
  dedao,
  palma,
  ariel,
} from "../../../../img";
import { Button } from "../../../../_components/Button";

import "./index.scss";
import FullscreenOverlay from "../../../../_components/FullscreenOverlay";

const CellphoneOverlay = ({
  startMaximized = false,
  showCloseButton = true,
  nextMessage,
  stopConversation,
  shouldMinimize,
  onMinimize,
  dialogHistory,
  endConversation,
  questions,
  addAnswerToDialog,
  autoLoad,
  shouldOverlayAll = false,
}) => {
  const [state, setState] = React.useState({
    maximized: startMaximized,
    shouldMinimize: false,
  });

  React.useEffect(() => {
    if (shouldMinimize) _shouldMinimize();
    //eslint-disable-next-line
  }, [shouldMinimize]);

  React.useEffect(() => {
    if (autoLoad) {
      setTimeout(() => {
        nextMessage();
      }, 1840+33*(dialogHistory.at(-1)?.text?.length ?? 0));
    }

    //eslint-disable-next-line
  }, [dialogHistory]);

  const _maximize = () => {
    if (!shouldOverlayAll) setState({ ...state, maximized: true });
  };

  const _shouldMinimize = () => {
    setState({ ...state, shouldMinimize: true });
  };

  const _minimized = () => {
    state.shouldMinimize = false;
    state.maximized = false;
    if (typeof onMinimize === "function") onMinimize();
  };

  return (
    <div id="phone">
      <div
        id="small-cellphone-wrapper"
        className={
          state.maximized
            ? "maximized"
            : null + shouldOverlayAll
            ? "z-index-overlay-all"
            : null
        }
      >
        <div id="small-cellphone-inner-wrapper">
          <div id="small-cellphone-content" onClick={_maximize}>
            <div id="small-cellphone-floating-text">
              <span lang="pt-br">Falar com Ariel</span>
              <span lang="default">Talk to Ariel</span>
            </div>
            <img src={smallPhone} alt="phone-small" />
            <img
              src={ariel}
              id="cellphone-small-pic"
              alt="cellphone-small-pic"
            />
          </div>
        </div>
      </div>
      {state.maximized && (
        <FullscreenOverlay
          showCloseBtn={showCloseButton}
          bgRGBA={{ r: 249, g: 175, b: 161, a: 0.69 }}
          closeHoverRGB={{ r: 255, g: 255, b: 255 }}
          onClickClose={_shouldMinimize}
          shouldExit={state.shouldMinimize}
          onReadyToExit={_minimized}
        >
          <div
            id="big-cellphone-wrapper"
            className={state.shouldMinimize ? "minimizing" : null}
          >
            <div id="big-cellphone-imgs">
              <img src={palma} alt="" />
              <img src={bigPhone} alt="" />
              <img src={dedao} alt="" />
            </div>
            <div id="big-cellphone-screen-wrapper">
              <div id="big-cellphone-screen-content">
                <div id="big-cellphone-screen-header">
                  <img src={ariel} alt="cellphone-profile-pic" />
                  <span>Ariel</span>
                </div>
                <div id="cellphone-dialog-screen-after-header">
                  <div
                    id="cellphone-dialog-history-wrapper"
                    className={
                      (stopConversation ? "has-ready-button" : "") +
                      (questions ? "has-questions-buttons" : "")
                    }
                  >
                    <div id="cellphone-dialog-history-content">
                      {[...dialogHistory].reverse().map((dialog, index) => (
                        <div
                          className={
                            "cellphone-mensagem" +
                            (dialog.speaker === "player" ? 0 : 1) +
                            (index === 0
                              ? " cellphone-animate-mensagem" +
                                (dialog.speaker === "player" ? 0 : 1)
                              : "")
                          }
                          key={index}
                        >
                          <span lang="pt-br" className="">
                            {dialog.text}
                          </span>
                          {dialog.textTranslate && (
                            <span lang="en" className="">
                              {dialog.textTranslate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {stopConversation && (
                    <Button
                      style={{
                        position: "relative",
                        margin: "1em auto",
                        width: "15em",
                        fontSize: "2.5em",
                      }}
                      onClick={endConversation}
                    >
                      Estou pronto!
                    </Button>
                  )}
                  {questions && (
                    <div>
                      {questions.map((question, index) => (
                        <Button
                          key={index}
                          style={{
                            position: "relative",
                            margin: ".5em auto",
                            width: "16em",
                            fontSize: "2.2em",
                            display: "block",
                            opacity: question.asked ? 0.3 : 1,
                          }}
                          onClick={addAnswerToDialog(index)}
                          disabled={question.asked}
                        >
                          {question.question}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FullscreenOverlay>
      )}
    </div>
  );
};
export default CellphoneOverlay;
