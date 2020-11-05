import React from 'react'
import './index.scss'

const Init = ({onClose}) => {
    return (
        <div>
            <div>Parabéns! Você foi contratado para trabalhar na escola X! Hoje é seu primeiro dia!</div>
            <button onClick={onClose}>Fechar resumo da missão</button>
        </div>
    )
}

export default Init
