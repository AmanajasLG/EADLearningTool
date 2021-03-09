import React from 'react'

const DialogHistory = ({dialogHistory}) => {
  return(
    <div id='DialogHistory'>
      <span></span>
      {dialogHistory.map((dialog, index)=>
        <div className={"mensagem" + (dialog.speaker==='player'? 0 : 1) } key={index}>{dialog.text}</div>
      )}
    </div>
  )
}

export default DialogHistory
