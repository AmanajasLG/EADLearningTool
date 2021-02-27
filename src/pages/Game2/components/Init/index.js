import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'
import classImage from '../../../../img/pic-people-talk.svg'

const Init = ({name, description, onClose, onStart, onBack}) => {
    return (
        <div className="main-wrapper">
          <div className="inner-content">
            <div name="infos">
              <img className="classImage" src={classImage}/>
              <h1 className="margin-half-top type-l type-display type-center">{name}</h1>
              <h1 className="type-m type-display type-center subtitle">Em inglês</h1>

              <h2 className="margin-half-top type-s type-center">{description}</h2>
              <h2 className="type-s type-center subdescription">Em inglês</h2>
            </div>
            <div id="btns">
              { onBack && <button className="btn btn-center" id="btn-back" onClick={onBack}>Voltar</button> }
              { onStart && <button className="btn btn-center" id="btn-start" onClick={onStart}>Iniciar</button> }
              { onClose && <button className="btn btn-center" id="btn-close" onClick={onClose}>Fechar</button> }
            </div>
          </div>
        </div>
    )
}

export default Init
