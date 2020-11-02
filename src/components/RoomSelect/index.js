import React from 'react'
import './index.scss'

const RoomSelect = ({roomsData, onChange}) => {
	const [state, setState] = React.useState(0)

	const buttonClick = (num) => () => {
		onChange(num)
		setState(num)
	}

    return (
        <div id="RoomSelect">
			{roomsData.map( (data, index) => <button className="RoomBtn" key={index} id={ state === index ? "selected" : "" } onClick={buttonClick(index)}>{data.nome}</button> )}
        </div>
    )
}

export default RoomSelect