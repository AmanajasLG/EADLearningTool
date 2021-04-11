import React from 'react'

const Dropdown = ({style, defaultText, onChange, label, optionList, value}) => {

  return(
    <div className={label}>
      <p>{label}</p>
      <select style={style} value={value} onChange={onChange}>
          <option value='' key={-1} disabled>{defaultText ?? "-- Selecione --"}</option>
        {optionList?.map((option, index) =>
          <option value={option} key={index}>{option}</option>
        )}
      </select>
    </div>
  )
}

export default Dropdown
