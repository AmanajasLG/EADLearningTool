import React from 'react'
import DialogBox from '../../../../_components/DialogBox'
import Button from '../../../../_components/Button'
import DialogCharacter from '../DialogCharacter'
import Writer from '../../../../_components/Writer'
import './index.scss'

const msPerCharacter = 30;
const waitAfterWritten = 3000;

const ChefDialog = ({hideDialog, onContinue, text, translation, chef, ...props}) => {
  const [state, setState] = React.useState({writerDone: false})
  const afterWriter = () => {
    console.log('Finished')
    setState({...state, writerDone: true})
  }

  return (
    <React.Fragment>
      {!hideDialog &&
        <DialogBox alternative>
          <div style={{paddingTop: '2%', paddingLeft: '30%'}}>
            <div>
              <Writer text={text} style={{fontSize: '1em', paddingLeft: 0}}
								onWritten={afterWriter}
								afterWrittenTime={waitAfterWritten}
								characterTime={msPerCharacter}
							/>
              {state.writerDone &&
                <hr className="stretchIn" style={{width: '10%', borderColor: '#F9AFA1'}}/>
              }
              {state.writerDone &&
                <div className='instructionText translation' lang="en">
                  {translation}
                </div>
              }
            </div>
          </div>
          {state.writerDone &&
            <Button onClick={onContinue} blink
              style={{position: 'absolute', right: '30px', bottom: '-20px'}}
            >
              Continuar >
            </Button>
          }
        </DialogBox>
      }
      <DialogCharacter character={chef} feeling="init" style={{position: 'absolute', left:0, bottom: 0, zIndex: 2, width: '43%'}}/>
    </React.Fragment>
  )
}
//

export default ChefDialog
