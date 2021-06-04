import React from 'react'
// import DialogHistory from '../../../../_components/DialogHistory'


const Cellphone = ({children, style, ...props}) => {
  return(
    <div style={{...style, position: 'relative'}}>
      {children}
    </div>
  )
}

export default Cellphone
