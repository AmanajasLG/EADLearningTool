import React from 'react'
import {Link} from 'react-router-dom'

const RoomSelect = ({onChange}) => {
	const [state, setState] = React.useState(0)

	const buttonClick = (num) => () => {
		setState(num)
		onChange(num)
	}

    return (
        <div>
			<button className="RoomBtn" onClick={buttonClick(1)}>Botão 1</button>
			<button className="RoomBtn" onClick={buttonClick(2)}>Botão 2</button>
			<button className="RoomBtn" onClick={buttonClick(3)}>Botão 3</button>
			<button className="RoomBtn" onClick={buttonClick(4)}>Botão 4</button>
			<button className="RoomBtn" onClick={buttonClick(5)}>Botão 5</button>
        </div>
    )
}

export default RoomSelect