import React from 'react'
import DialogCharacter from '../DialogCharacter'
import DialogHistory from '../DialogHistory'
import Writer from '../Writer'
import Menu from '../Menu'

const DialogSet = ({children, onClose, character, characterFace, dialogHistory, writerText, onWriterDone, afterWrittenTime, writerCharacterTime, menuButtonList, onMenuButtonClick }) => {
  //<AcusationLamp onClick={() => setState({...state, acusation: true})} />
  return(
    <div id="conversa" className='DialogPopUp'>
      <div id="fechar" onClick={onClose}><span>×</span></div>

      <DialogCharacter character={character} face={characterFace}/>

      <div id="dialogos">
        <DialogHistory dialogHistory={dialogHistory}/>

        <div id='DialogBox'>
          {writerText ?
            <Writer text={writerText}
              onWritten={onWriterDone}
              afterWrittenTime={afterWrittenTime}
              characterTime={writerCharacterTime}
            />
            :
            <Menu buttonList={menuButtonList}
              onButtonClick={onMenuButtonClick}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default DialogSet
