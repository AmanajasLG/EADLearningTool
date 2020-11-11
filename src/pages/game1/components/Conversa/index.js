import React from 'react'
import ConversaQuiz from '../ConversaQuiz'
import ConversaInicial from '../ConversaInicial'
import './conversa.scss'

const Conversa = ({endGame, handleSubmit, quizOptions, charData, checkEnd, clearCurrentChar}) => {
    return (
        <div id="conversa">
            { endGame ?
                <ConversaQuiz handleSubmit={handleSubmit} quizOptions={quizOptions} />
                :
                <ConversaInicial charData={charData} checkEnd={checkEnd} clearCurrentChar={clearCurrentChar}/>
            }
        </div>
    )
}

export default Conversa
