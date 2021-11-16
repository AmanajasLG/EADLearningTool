import React from 'react'
import {palma, bigPhone, dedao} from '../../img'

const HandPhone = ({children, screenBackgroundColor}) => {
  return(
    <div id="big-phone-wrapper">
      <div id="big-phone-imgs">
        <img src={palma} alt="" />
        <img src={bigPhone} alt=""/>
        <img src={dedao} alt=""/>
      </div>
      <div id="big-phone-screen-wrapper">
        <div id="big-phone-screen-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default HandPhone
