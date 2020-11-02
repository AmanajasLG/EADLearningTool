import React from 'react'
import './personagem.scss'

const Personagem = ({charData, setCurrentChar}) => {
    return (
    <div>
        <div className="CharDiv" onClick={setCurrentChar(charData)}>
            {charData.nome}, {charData.trabalho}, {charData.estadoCivil}
        </div>
    </div>
    )
}

export default Personagem