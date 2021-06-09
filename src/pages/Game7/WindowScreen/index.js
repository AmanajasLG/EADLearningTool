import React from 'react'

const WindowScreen = ({children, style, ...props}) => {
  return(
    <div style={{backgroundColor: '#aaaaff', ...style}} {...props}>
      {children}
    </div>
  )
}

export default WindowScreen
