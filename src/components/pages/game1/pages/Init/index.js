import React from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

const Init = () => {
    return (
        <div>
            <div>Parabéns! Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</div>
            <Link to="/game">Começar</Link>
        </div>
    )
}

export default Init