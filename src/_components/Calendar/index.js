import React from 'react'
import Button from '@material-ui/core/Button'
import Counter from '../Counter'
import { months } from '../../_helpers'

const Calendar = ({day, month, onDaySelected, onMonthChange}) => {
  return(
    <div>
      <Counter value={month} list={months} onChange={ value => onMonthChange(value)}/>
      <div style={{display: 'grid', width: '100%', height: '75%',
        gridTemplateColumns: `${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}%`,
        gridTemplateRows: `20% 20% 20% 20% 20%`}}
      >
        {Array.from({length: 31}, (_, i) => i + 1).map((num, index) =>
          <Button key={index}
            style={{backgroundColor: day === num? '#ffdddd' : null}}
            onClick={onDaySelected? () => onDaySelected(num) : null}>
            {num}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Calendar
