import React from 'react'
import './index.scss'

const Init = ({icon, name, description, nameTranlate = "Name", descriptionTranlate = "Description", onStart, onBack, onSeeTutorial}) => {
    return (
        <div className="main-init-wrapper">
          <div className="inner-content">
            <div name="infos">
              <img className="classImage" src={icon} alt=""/>
              <h1 className="margin-half-top type-l type-display type-center">{name}</h1>
              <h1 className="type-m type-display type-center subtitle">{nameTranlate}</h1>

              <h2 className="margin-half-top type-s type-center">{description}</h2>
              <h2 className="type-s type-center subdescription">{descriptionTranlate}</h2>
            </div>
            <div id="btns">
              { onBack && <button className="btn btn-center" id="btn-back" onClick={onBack}>Voltar</button> }
              { onStart && <button className="btn btn-center" id="btn-start" onClick={onStart}>Iniciar</button> }
              { onSeeTutorial && <button className="btn btn-center" id="btn-tutorial" onClick={onSeeTutorial}>Ver tutorial</button> }
            </div>
          </div>
        </div>
    )
}

export default Init
