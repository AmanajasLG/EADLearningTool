import React from "react";
import "./index.scss";

import {
  Button,
  ButtonConfigs,
  Iniciar,
  Voltar,
} from "../../../../_components/Button";
import { preventSingleWordBreak } from "../../../../_helpers";

const Notification = ({
  blobMessage,
  continueButtonLabel,
  onClickToContinue,
  backButtonLabel,
  onClickToBack,
}) => {
  return (
    <React.Fragment>
      <div className="overlay-notification">
        <div className="notification-blob absolute-center">
          <div className="notification-content">
            <span lang="pt-br">{preventSingleWordBreak(blobMessage.text)}</span>
            <span lang="en">
              {preventSingleWordBreak(blobMessage.textTranslate)}
            </span>

            {backButtonLabel ? (
              <div className="notification-buttons">
                <Voltar label={backButtonLabel} onClick={onClickToBack} />
                <Iniciar
                  label={continueButtonLabel}
                  onClick={onClickToContinue}
                />
              </div>
            ) : (
              <div className="notification-buttons">
                <Button
                  blink
                  colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
                  onClick={onClickToContinue}
                >
                  {continueButtonLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notification;
