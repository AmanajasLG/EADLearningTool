import React from 'react'

const DefaultHeader = ({pageInfo}) => {

	return (
		<header id="app-header" className="normal">
			<div className="group-btns">
				<div className="header-btn">Home</div>
				<div className="header-btn">About</div>
			</div>
		</header>
	)
	
}

export default DefaultHeader