import React from 'react'
import './index.scss'

const Result = ({gameEndState}) => {
    return (
        <div>
            {/* Não era pra a gente precisar checar se a string é null, pq era pra isso
            só aparecer quando já tivesse um valor na string... WTF */}
            { gameEndState ? gameEndState.split('\n').map( str => <p>{str}</p>) : null}
        </div>
    )
}

export default Result
