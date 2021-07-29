import React from 'react'

const WindowScreen = ({children, style, ...props}) => {
  const colors = ['#f9afa1', '#ffdea9', '#cbe7de']
  return(
    <div style={{backgroundColor: '#aaaaff', ...style}} {...props}>
      <div style={{backgroundColor: '#bbbbbb', height: '4%', paddingLeft: '1%'}}>
        {colors.map( (color, index) =>
          <div key={index} style={{backgroundColor: color, margin: '0.5%', display: 'inline-block', height: '40%', width:'1%', borderRadius: '80%'}}></div>
        )}
      </div>
      {children}
    </div>
  )
}

export default WindowScreen
