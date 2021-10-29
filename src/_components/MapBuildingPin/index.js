import React from 'react'

const MapBuildingPin = ({children, style, ...props}) => {
  return(
    <div
      className="location"
      style={{
        borderRadius: 100,
        borderBottomLeftRadius: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: '3px 3px rgb(0 0 0 / 0.3)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default MapBuildingPin
