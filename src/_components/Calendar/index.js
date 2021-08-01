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

  const setColor = num => {
    if(dates.length > 0){
      //if(num === dates[0].day || num === dates[dates.length - 1].day)
      //  return '#fdcccc'
      if(dates[0].day <= num && num <= dates[dates.length - 1].day)
        return '#ffdddd'
    }
    return null
  }
  console.log('dates', dates)
  return(
    <div style={{width: '100%'}}>
      <Counter value={monthValue} list={months} onChange={ monthChange }/>
      <Button onClick={() => setDates([])}>Limpar datas</Button>
      <div style={{display: 'grid',
        gridTemplateColumns: `${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}%`,
        gridTemplateRows: `20% 20% 20% 20% 20% 20%`,
        padding: '5%'
      }}
      >
        {['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].map( (value, index) =>
          <p key={index} style={{textAlign: 'center'}}>{value}</p>
        )}
        {Array.from({length: 31}, (_, i) => i + 1).map((num, index) =>
          <div key={index}
            style={{cursor: 'pointer',
              backgroundColor: setColor(num),
              padding: '0 10% 0 10%'
            }}
            onClick={() => dateSelect(num)}>
            <p style={{borderRadius: '50%', textAlign: 'center',
                backgroundColor:  dates.length > 0 && (num === dates[0].day || num === dates[dates.length - 1].day) ? '#fdcccc' : null }}>
            {num}
          </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
