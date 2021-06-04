import React from 'react'
import DialogBox from '../../../../_components/DialogBox'
import Button from '../../../../_components/Button'
import DialogCharacter from '../DialogCharacter'
import Writer from '../../../../_components/Writer'
import './index.scss'
import { LineWeight } from '@material-ui/icons'

const msPerCharacter = 30;
const waitAfterWritten = 1000;

const ChefDialog = ({hideDialog, onContinue, text, translation, chef, ...props}) => {
  const [state, setState] = React.useState({writerDone: false})
  const onWriterDone = () => setState({...state, writerDone: true})
  let chefStyles =  {position: 'absolute', left:0, bottom: 0, zIndex: 2, width: '43%'}

  console.log('props:', props)
  if(props.chefStyles)
    chefStyles = {...chefStyles, ...props.chefStyles }

  return (
    <React.Fragment>
      {!hideDialog &&
        <DialogBox alternative>
          <div style={{paddingTop: '2%', paddingLeft: '30%'}}>
            <div style={{fontSize: "1.6em"}}>
              <Writer text={text} style={{fontSize: '1em', paddingLeft: 0}}
								onWritten={onWriterDone}
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
            id="btn-start"
              style={{fontSize: '1.75em', position: 'absolute', right: '30px', bottom: '-20px', fontWeight: 800, padding: "0.72em 1.43em"}}
            >
              Continuar
            </Button>
          }
        </DialogBox>
      }
      <DialogCharacter character={chef} feeling="init" style={chefStyles}/>
    </React.Fragment>
  )
}
//

export default ChefDialog
