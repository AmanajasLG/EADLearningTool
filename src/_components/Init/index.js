import React from "react";
import "./index.scss";
import CircularProgress from '@material-ui/core/CircularProgress'

const Init = ({
  icon,
  name,
  description,
  nameTranslate = "Name",
  descriptionTranslate = "Description",
  onStart,
  onBack,
  ready,
}) => {
  return (
    <div className="main-init-wrapper">
      <div className="inner-content">
        <div name="infos">
          {icon ? (
            <img className="classImage" src={icon} alt="" />
          ) : (
            <div style={{ height: "25vh" }}></div>
          )}

          <h1 className="margin-half-top type-l type-display type-center">
            {name}
          </h1>
          <h1 className="type-m type-display type-center subtitle">
            {nameTranslate}
          </h1>

          <h2 className="margin-half-top type-s type-center description">
            {description}
          </h2>
          <h2 className="type-s type-center subdescription">
            {descriptionTranslate}
          </h2>
        </div>

        <div id="btns">
          {onBack && (
            <button className="btn btn-center" id="btn-back" onClick={onBack}>
              Voltar
            </button>
          )}
          {ready ?
            (onStart &&
              <button className="btn btn-center" id="btn-start" onClick={onStart}>
                Iniciar
              </button>
            )
            :
            <span>
              LOADING <CircularProgress />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Init;
