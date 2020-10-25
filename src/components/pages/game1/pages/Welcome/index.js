import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Welcome = () => {
    return (
        <div>
            <div>Parabéns! Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</div>
            <Link to="/page2">Começar</Link>
        </div>
    )
}

export default Welcome