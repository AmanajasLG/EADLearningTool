import React from "react";
import { BlobBg } from "../Blob";
import { Iniciar, ButtonConfigs } from "../../_components/Button";
import { preventSingleWordBreak } from "../../_helpers";

import "./index.scss";
import marked from "marked";
import parse from "html-react-parser";

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
          <div style={{ fontWeight: 700 }}>{parse(marked(preventSingleWordBreak(text)))}</div>
          <hr style={{
              borderWidth: "0 0 0.1em 0",
              borderStyle: "solid",
              width: "33%",
              margin: "0.75em auto",
              color: "var(--color-fourth)",
            }}/>
          <div style={{ fontStyle: "italic" }}>{parse(marked(preventSingleWordBreak(translation)))}</div>
        </div>

        {onContinue && (
          <Iniciar
            style={{
              marginTop: "2em",
              fontSize: "3em",
            }}
            colorScheme={ButtonConfigs.COLOR_SCHEMES.COR_5}
            label={endTutorial ? "Jogar / Play" : "Continue"}
            onClick={onContinue}
          ></Iniciar>
        )}
      </div>
    </div>
  );
};

export default TutorialBlob;
