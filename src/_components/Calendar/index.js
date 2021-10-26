import React from 'react'
import Counter from '../Counter'
import { months } from '../../_helpers'
import './index.scss'

const Calendar = ({noLeft, noRight, clear, dates, month, valueIndex, onChange}) => {

  const [datesValue, setDates] = React.useState(dates ? dates : [null, null])
  const [monthValue, setMonth] = React.useState(month ? month : 0)
  const dateSelect = num => {
    console.log('clicked:', num)
    console.log('datesValue:', datesValue)
    let d = datesValue.slice(0)
    if(d[0] === null)
      d[0] = {day: num, month: monthValue}
    else if(d[1] === null)
    {
      if(d[0].month < monthValue || (d[0].month === monthValue && num > d[0].day))
      {
        console.log('should enter here')
        d[1] = {day: num, month: monthValue}
      }
      else if(num < d[0].day)
      {
        let temp = d[0]
        d[0] = {day: num, month: monthValue}
        d[1] = temp
      }
    }
    else{
      d[0] = {day: num, month: monthValue}
      d[1] = null
    }
    console.log('d', d)
    setDates(d)
  }

  React.useEffect(() => {
    console.log('month changed')
    setMonth(month)
  }, [month])

  React.useEffect(() => {
    console.log('received dates changed')
    if(dates === datesValue || (dates[0] === datesValue[0] && dates[1] === datesValue[1]) ||
      (dates[0] !== null && datesValue[0] !== null && dates[0].day === datesValue[0].day && dates[0].month === datesValue[0].month &&
       dates[1] !== null && datesValue[1] !== null && dates[1].day === datesValue[1].day && dates[1].month === datesValue[1].month))
      return

    setDates([...dates])
  // eslint-disable-next-line
  }, [dates])

  React.useEffect(() => {

    let obj = {month: monthValue, dates: datesValue}
    console.log('monthValue changed', obj)
    if(onChange) onChange(obj)
    // eslint-disable-next-line
  }, [monthValue, datesValue])

  const setColor = num => {
      if(isDaySelected(num)){
        let side = num === datesValue[0].day && datesValue[0].month === monthValue ? 'right' : 'left'
        return `-webkit-linear-gradient(${side}, #ffeeee, #ffeeee 50%, transparent 50%, transparent 100%)`
      }
      if(isDayInRange(num))
        return '-webkit-linear-gradient(top, #ffeeee, #ffeeee 100%, transparent 100%, transparent 100%)'
    return null
  }

  const isDayInRange = num =>
    datesValue[0] && datesValue[1] &&
    (
      (((datesValue[0].month === monthValue && monthValue === datesValue[1].month) &&
        datesValue[0].day < num && num < datesValue[1].day) ||
      (datesValue[0].month !== monthValue || monthValue !== datesValue[1].month)) && 
      (
        (datesValue[0].month === monthValue && datesValue[0].day < num) ||
        (datesValue[1].month === monthValue && num < datesValue[1].day) ||
        (datesValue[0].month < monthValue && monthValue < datesValue[1].month)
      )
    )

  const isDaySelected = num =>
    (datesValue[0] && num === datesValue[0].day && monthValue === datesValue[0].month) ||
    (datesValue[datesValue.length - 1] && num === datesValue[datesValue.length - 1].day && monthValue === datesValue[datesValue.length - 1].month)

  return(
    <div style={{width: '100%', height: '100%', paddingLeft: '2%', paddingRight: '2%'}}>
      <Counter stretch noLeft={ noLeft } noRight={ noRight } value={ monthValue } list={ months } onChange={ value => setMonth(value) }/>
      <div style={{display: 'grid',
        gridTemplateColumns: `${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}% ${100/7}%`,
        gridTemplateRows: `20% 20% 20% 20% 20% 20%`,
        rowGap: '3%',
        paddingTop: 0
      }}
      >
        {['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].map( (value, index) =>
          <p key={index} style={{textAlign: 'center', transform: 'translateY(50%)'}}>{value}</p>
        )}
        {Array.from({length: 31}, (_, i) => i + 1).map((num, index) =>
          <div key={index}
            className='calendarButton'
            style={{cursor: 'pointer',
              backgroundImage: setColor(num),
              padding: '0 10% 0 10%',
            }}
            onClick={() => dateSelect(num)}>
            <p style={{borderRadius: '50%', textAlign: 'center', height: '100%', aspectRatio: '1', transform: 'translateY(20%)',
                backgroundColor: isDaySelected(num) ? '#fdcccc' : null }}>
            {num}
          </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calendar
