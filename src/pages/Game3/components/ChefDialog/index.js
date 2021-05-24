import React from 'react'
import DialogBox from '../../../../_components/DialogBox'
import Button from '../../../../_components/Button'
import DialogCharacter from '../../../../_components/DialogCharacter'
import './index.scss'

const ChefDialog = ({hideDialog, onContinue, text, translation, chef, ...props}) => {
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}} {...props}>
      {!hideDialog &&
        <DialogBox alternative>
          <div style={{paddingTop: '2%', paddingLeft: '30%'}}>
            <div>
              <div className='instructionText default' lang="pt-br">
                {text}
              </div>
              <hr style={{width: '10%', borderColor: '#F9AFA1'}}/>
              <div className='instructionText translation' lang="en">
                {translation}
              </div>
            </div>
          </div>

          <Button onClick={onContinue} blink
            style={{position: 'absolute', right: '30px', bottom: '-20px'}}
          >
            Continuar >
          </Button>
        </DialogBox>
      }
      <DialogCharacter character={chef} feeling="init" style={{height: 650, left:0}}/>
    </div>
  )
}
//

export default ChefDialog
