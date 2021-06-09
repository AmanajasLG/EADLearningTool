import React from 'react'
import Button from '@material-ui/core/Button'

const Calendar = ({onClick}) => {
  return(
    <div style={{display: 'grid', width: '100%', height: '75%',
      gridTemplateColumns: `${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}%`,
      gridTemplateRows: `20% 20% 20% 20% 20%`}}
    >
    {Array.from({length: 31}, (_, i) => i + 1).map((num, index) => <Button key={index} onClick={onClick? onClick(num) : null}>{num}</Button>)}
    </div>
  )
}

export default Calendar
