import React from "react";
import "./index.scss";

import { Button, ButtonConfigs } from "../../../../_components/Button";

const TutorialWardrobe = ({ blobMessage, onClickToEnd, index }) => {
  let blobPosition =
    index === 1 ? " blob-left" : index === 2 ? " blob-right" : " blob-center";

  console.log(blobPosition);

  return (
    <React.Fragment>
      <div className="overlay-tutorial-notification">
        <div className="overlay-tutorial-notification-content">
          <div className={"tutorial-notification-message" + blobPosition}>
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

export default TutorialWardrobe;
