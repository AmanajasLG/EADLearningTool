import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Init = () => {
    return (
        <div class="main-wrapper bg-shape-bottom">
            <div><h1 class="type-l type-display type-center">Parabéns!</h1> 
            <h2 class="type-m type-center">Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</h2></div>
            <Link to="/game" class="btn btn-center">Começar</Link>
        </div>
    )
}

export default Init