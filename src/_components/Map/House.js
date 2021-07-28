import React from 'react'

const House = (props) => {
  return(
    <g className="House stretchIn" {...props}>
      {props.children}
    </g>
  )
}

export default House
