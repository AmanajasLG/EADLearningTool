import React from 'react'
import DialogBox from '../../../../_components/DialogBox'
import Button from '@material-ui/core/Button'
import DialogCharacter from '../../../../_components/DialogCharacter'
import './index.scss'

const buttonStyle = {
  fontFamily: 'Barlow',
  fontWeight: 'bold',
  color: '#59316D',
  border: 'none',
  width: 100, height: 50,
  position: 'absolute',
  right: '-10px', bottom: '-10px',
  backgroundColor: '#F9AFA1',
  borderRadius: '50px 50px 50px 0px',
  cursor: 'pointer'
}

const ChefDialog = ({onContinue, text, translation, chef}) => {
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
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

        <button
          style={buttonStyle}
          onClick={onContinue}
        >
          Continuar >
        </button>
      </DialogBox>
      <DialogCharacter character={chef} feeling="init" style={{height: 650, left:0}}/>
    </div>
  )
}


export default ChefDialog
