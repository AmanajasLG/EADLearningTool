import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'
import classImage from '../../../../img/pic-people-talk.svg'

const Init = ({onClose}) => {
    return (
        <div className="main-wrapper bg-shape-bottom">
            <div>
                <img className="classImage" src={classImage}/>
                <h1 className="margin-half-top type-l type-display type-center">Parabéns!</h1>
            <h2 className="type-m type-center">Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</h2></div>
            <button className="margin-half-top btn btn-center" onClick={onClose}>Fechar resumo da missão</button>
        </div>
    )
}

export default Init
