import React from 'react'
import './index.scss'

const Pill = ({blink, disabled, stayAsPill, hoverable, children, ...props}) => {
   return(
     <div
       className={'pill ' +
         (blink? 'blink ':'') +
         (hoverable? 'hoverable ': '') +
         (disabled? 'hidden ': '')
       }
      {...props}
    >
      {children}
    </div>
  )
}

export default Pill
