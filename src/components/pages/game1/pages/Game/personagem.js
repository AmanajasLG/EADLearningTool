import React from 'react'

const Personagem = ({charData, setCurrentChar}) => {

    const [state, setState] = React.useState({visibilidadeConversa: false});

    
    return (
    <div>
        <div className="CharDiv" onClick={setCurrentChar(charData)}>
            {charData.nome}, {charData.trabalho}, {charData.estadoCivil}
        </div>
    </div>
    )
}

export default Personagem