import React from 'react'

import DressingCharacter from '../../_components/DressingCharacter'

const Feedback = ({data}) =>{
  return(
    <div>
      <DressingCharacter
        character={data.choosenCharacter}
        clothes={data.clothes}
        style={{
          position: 'absolute',
          height: '100%',
          width: '47%',
          left: '-10%',
          top: '5%'
        }}
      />
    </div>
  )
}

export default Feedback
