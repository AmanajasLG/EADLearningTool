import React from "react";

import { Button, ButtonConfigs } from "../../../../_components/Button";

const Tutorial = ({ blobMessage, onClickToEnd }) => {
  return (
    <React.Fragment>
      <div className="overlay-tutorial-notification">
        <div className="overlay-tutorial-notification-content blob-right">
          <div className="tutorial-notification-message">
            <span lang="pt-br">{blobMessage.text}</span>
            <span lang="en">{blobMessage.textTranslate}</span>
            <Button
              blink
              colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_3}
              onClick={onClickToEnd}
            >
              Entendi! / Got it!
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tutorial;
