import React from 'react'
import './index.scss'

const RoomSelect = ({value, buttonList, onChange}) => {
	const [state, setState] = React.useState(0)

	const buttonClick = (num) => () => {
		if(onChange) onChange(num)
		setState(num)
	}

	React.useEffect(() => {
		setState(value)
	}, [value])

  return (
	<div id="RoomSelect">
		<div className="section-title">
			<span lang="pt-br">Salas</span>
			<span lang="en">Rooms</span>
		</div>
		<div id="button-rows">
			{buttonList.map( (name, index) =>
				<button className="RoomBtn" key={index}
				id={ state === index ? "selected" : "" }
				onClick={buttonClick(index)}
				>
					{index+1}
				</button> )}
		</div>
	</div>
  )
}

export default RoomSelect
