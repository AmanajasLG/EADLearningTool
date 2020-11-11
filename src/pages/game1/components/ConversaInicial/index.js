import React from 'react'

const ConversaInicial = ({charData, clearCurrentChar, checkEnd}) => {
  return(
    <div id="charData">
        <div id="charName">Meu nome é {charData.nome}</div>
        <div id="charJob">Minha profissão é {charData.trabalho}</div>
        <div id="charState">Meu estado civil é {charData.estadoCivil}</div>
        <div id="conversationActions">
            <button onClick={clearCurrentChar}>Continuar procurando</button>
            <button onClick={checkEnd}>É fulano</button>
        </div>
    </div>
  )
}

export default ConversaInicial
