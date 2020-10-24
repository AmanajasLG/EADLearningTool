import React from 'react'
import {Link} from 'react-router-dom'

const Page2 = () => {
	const [state, setState] = React.useState({room: 0});

	const buttonClick = (num) => () => {
		setState({room: num});
	}

    return (
        <div>
            <div>Página2</div>
			<div>Estado: {state.room}</div>
			<button onClick={buttonClick(1)}>Botão 1</button>
			<button onClick={buttonClick(2)}>Botão 2</button>
			<button onClick={buttonClick(3)}>Botão 3</button>
			<button onClick={buttonClick(4)}>Botão 4</button>
        </div>
    )
}

export default Page2