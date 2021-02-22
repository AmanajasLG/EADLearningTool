import React from 'react'
import './index.scss'

const RoomSelect = ({buttonList, onChange}) => {
	const [state, setState] = React.useState(0)

	const buttonClick = (num) => () => {
		onChange(num)
		setState(num)
	}

    return (
        <div id="RoomSelect">
					{buttonList.map( (name, index) =>
						<button className="RoomBtn" key={index}
							id={ state === index ? "selected" : "" }
							onClick={buttonClick(index)}
						>
							{name}
						</button> )}
        </div>
    )
}

export default RoomSelect
