import React from 'react'
import Personagem from './personagem.js'
import './sala.css'

const Sala = ({roomData, setCurrentChar}) => {
    return (
        <div id="sala" style={{backgroundColor: roomData.cor}}>
            {roomData.personagens.map((data, index) => <Personagem key={index} charData={data.charData} diagData={data.diagData} setCurrentChar={setCurrentChar} /> )}
        </div>
    )
}

export default Sala