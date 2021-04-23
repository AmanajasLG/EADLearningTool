import React from 'react'
import './index.scss'

const RoomSelect = ({value, buttonList, onChange, showInBtnFormat = true}) => {
	const [state, setState] = React.useState(0)

	const buttonClick = (num) => () => {
		if(onChange) {
			onChange(num)
			setState(num)
		}
	}

	React.useEffect(() => {
		if(value) setState(value)
	}, [value])

	if( showInBtnFormat ) {
		return (
			<div id="RoomSelect">
				<div className="section-title">
					<span lang="pt-br">Salas</span>
					<span lang="en">Rooms</span>
				</div>
				<div id="button-rows">
					{buttonList.map( (name, index) =>
						<button className={"RoomBtn" + (onChange ? "" : " disabled")} key={index}
						id={ state === index ? "selected" : "" }
						onClick={buttonClick(index)}
						>
							{index+1}
						</button> )}
				</div>
			</div>
			)
	} else {
		return (
			<div id="RoomSelect">
				<div className="section-title">
					<span lang="pt-br">Sala</span>
					<span lang="en">Room {state+1}</span>
				</div>
			</div>
			)
	}
}

export default RoomSelect
