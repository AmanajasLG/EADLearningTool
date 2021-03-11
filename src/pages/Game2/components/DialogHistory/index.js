import React from 'react'

const DialogHistory = ({dialogHistory}) => {
  return(
    <div id='DialogHistory'>
      <span></span>
      {dialogHistory.map((dialog, index)=>
        <div className={"mensagem"+(index%2)} key={index}>{dialog}</div>
      )}
    </div>
  )
}

export default DialogHistory
