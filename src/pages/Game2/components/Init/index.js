import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'
import classImage from '../../../../img/pic-people-talk.svg'

const Init = ({name, description, onClose, onStart, onBack}) => {
    return (
        <div className="main-wrapper bg-shape-bottom">
            <div>
              <img className="classImage" src={classImage}/>
              <h1 className="margin-half-top type-l type-display type-center">{name}</h1>
              <h1 className="margin-half-top type-l type-display type-center">em inglês</h1>

              <h2 className="type-m type-center">{description}</h2>
              <h2 className="type-m type-center">em inglês</h2>
            </div>
            <div>
              { onBack && <button className="margin-half-top btn btn-center" onClick={onBack}>{'< Voltar'}</button> }
              { onStart && <button className="margin-half-top btn btn-center" onClick={onStart}>{'Iniciar >'}</button> }
              { onClose && <button className="margin-half-top btn btn-center" onClick={onClose}>Fechar</button> }
            </div>
        </div>
    )
}

export default Init
