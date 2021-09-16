import React from "react";
import { BlobBg } from "../Blob";
import Button from "@material-ui/core/Button";
import { Iniciar } from "../../_components/Button";
import { preventSingleWordBreak } from "../../_helpers";

import "./index.scss";

const TutorialBlob = ({
  text,
  translation,
  position = "top-right",
  onContinue,
  endTutorial,
  style,
  ...props
}) => {
  return (
    <div style={{ textAlign: "center", ...style }} {...props}>
      <BlobBg
        blob={{ fill: "#f9afa1" }}
        className={"default-config-blob " + position + "-blob"}
      ></BlobBg>
      <div className={"default-config-txt " + position + "-txt"}>
        <div style={{ fontSize: "3em" }}>
          {preventSingleWordBreak(text)}
          <hr />
          {preventSingleWordBreak(translation)}
        </div>

        {onContinue && (
          <Iniciar
            style={{ marginTop: "2em", fontSize: "3em" }}
            label={endTutorial ? "Jogar / Play" : "Continue"}
            onClick={onContinue}
          ></Iniciar>
        )}
      </div>
    </div>
  );
};

export default TutorialBlob;
