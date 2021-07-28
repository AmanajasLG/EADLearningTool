import React from 'react'
import Button from '@material-ui/core/Button'
import Counter from '../Counter'
import { months } from '../../_helpers'

const Calendar = ({clear, month, valueIndex, onChange}) => {

  const [monthValue, setMonth] = React.useState(month ? month : 0)
  const [dates, setDates] = React.useState([])

  const dateSelect = num => {
    let d = dates.slice(0)
    console.log('d:', d)
    if(valueIndex === null || valueIndex === undefined)
      valueIndex = 0

    console.log('valueIndex:', valueIndex)
    if(valueIndex > dates.length - 1)
    {
      d = [...d, ...new Array( valueIndex - (dates.length - 1) )]
    }
    d[valueIndex] = {day: num, month: monthValue}
    console.log('d:', d)
    setDates(d)
  }

  const monthChange = value => setMonth(value)

  React.useEffect(() => {
    console.log('called useEffect d:', dates)
    if(onChange) onChange({month: monthValue, dates: dates})
  }, [monthValue, dates])

  console.log('dates', dates)
  return(
    <div>
      <Counter value={monthValue} list={months} onChange={ monthChange }/>
      <Button onClick={() => setDates([])}>Limpar datas</Button>
      <div style={{display: 'grid', width: '100%', height: '75%',
        gridTemplateColumns: `${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}%`,
        gridTemplateRows: `20% 20% 20% 20% 20%`}}
      >
        {Array.from({length: 31}, (_, i) => i + 1).map((num, index) =>
          <Button key={index}
            style={{backgroundColor: dates.find(d => d.day === num)? '#ffdddd' : null}}
            onClick={() => dateSelect(num)}>
            {num}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Calendar
