import React from 'react'

import Button from '@material-ui/core/Button'

import Airplane from '@material-ui/icons/AirplanemodeActive'
import TakeoffIcon from '@material-ui/icons/FlightTakeoff'
import LandIcon from '@material-ui/icons/FlightLand'

import { zeroFill } from '../../_helpers'

const Flights = ({selected, flights, onClick}) => {
  return(
    <div>
    {flights && flights.map((fly, index) =>
      <Button onClick={() => onClick ? onClick(index) : null}
        style={{backgroundColor: selected === index? '#ff9999' : 'white', display: 'block', }} key={index}>
        Voo <Airplane /> {zeroFill( `${Math.floor(Math.random() * 10000)}`, 4)} <TakeoffIcon /> {fly.takeOff} : {fly.land} <LandIcon />
      </Button>
    )}
    </div>
  )
}

export default Flights
