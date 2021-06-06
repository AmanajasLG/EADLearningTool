import React from "react";
import "./index.scss";
import CircularProgress from '@material-ui/core/CircularProgress'
// import { useDispatch, useSelector } from 'react-redux'
import {Iniciar, Voltar} from '../Button'
import Blob from '../Blob'

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
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Blob style={{position: 'relative', width: '100%', top: 0, left: 0, zIndex: -10}}/>
        <Blob fill="none" duration="12s" stroke="#59316d" strokeWidth={4} style={{position: 'relative', width: '100%', top: 0, left: 0, zIndex: -9}}/>
      </div>
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

          <h2 className="margin-top type-s type-center description">
            {description}
          </h2>
          <h2 className="type-s type-center subdescription">
            {descriptionTranslate}
          </h2>
        </div>

        <div id="btns">
          {onBack && (
            <Voltar onClick={onBack}/>
          )}
          {ready ?
            (onStart &&
              <Iniciar onClick={onStart} />
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
