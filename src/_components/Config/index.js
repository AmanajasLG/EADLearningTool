import React from 'react'

const Config = (props) => {
  return(
    <div style={{position: 'absolute', backgroundColor: '#ddddee', top: '20%', left: '200', width: '50%', height: 500}}>
      Configurações de jogo
      {props.children}
    </div>
  )
}

export default Config
