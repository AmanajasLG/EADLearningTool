import React from 'react'
import Personagem from './personagem.js'
import './sala.scss'

const Sala = ({roomData, setCurrentChar}) => {
    return (
        <div id="sala">
            {roomData.personagens.map((data, index) => <Personagem key={index} charData={data.charData} diagData={data.diagData} setCurrentChar={setCurrentChar} /> )}
        </div>
    )
}

export default Sala