import React from 'react'

const Dropdown = ({onChange, label, optionList, value}) => {

  return(
    <div>
      <p>{label}</p>
      <select value={value} onChange={onChange}>
        {optionList.map((option, index) =>
          <option value={option} key={index}>{option}</option>
        )}
      </select>
    </div>
  )
}

export default Dropdown
