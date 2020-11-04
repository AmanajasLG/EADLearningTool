import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import classImage from './img/pic-people-talk.svg'

const Init = () => {
    return (
        <div class="main-wrapper bg-shape-bottom">
            <div>
                <img className="classImage" src={classImage}/>
                <h1 class="margin-half-top type-l type-display type-center">Parabéns!</h1> 
            <h2 class="type-m type-center">Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</h2></div>
            <Link to="/game" class="margin-half-top btn btn-center">Começar</Link>
        </div>
    )
}

export default Init