import React from 'react'
import { BlobBg } from '../Blob'
import { Iniciar } from '../../_components/Button'

const TutorialBlob = ({text, translation, onContinue, style, ...props}) => {
  return(
    <div style={{textAlign: 'center', ...style}} {...props}>
      <BlobBg blob={{fill:  '#f9afa1'}}
        style={{position: 'absolute', right: '-20%', top: '-20%', width: '80%', height: '80%'}}>
      </BlobBg>
      <div style={{position: 'absolute', margin: '5% 8%', right: 0, width: '25%', height: '30%'}}>
        <div style={{fontSize: '3em'}}>
          {text}
          <hr/>
          {translation}
        </div>

        <Iniciar style={{marginTop: '30%', fontSize: '3em'}} label='Continue' onClick={onContinue ? onContinue : null}>
        </Iniciar>
      </div>
    </div>
  )
}

export default TutorialBlob
