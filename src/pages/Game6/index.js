import React from 'react'
import { Redirect} from 'react-router-dom'

import initialState from './initialState'
import stub from './stub'
import Init from '../../_components/Init'
import FullscreenOverlay from '../../_components/FullscreenOverlay'
import DressingCharacter from '../../_components/DressingCharacter'
import Wardrobe from '../../_components/Wardrobe'
import DialogHistory from '../../_components/DialogHistory'
import Cellphone from './components/Cellphone'
import Button from '../../_components/Button'

const Game6 = () => {
  const [state, setState] = React.useState(initialState())
  const mission = stub
  const onStartGame = () => setState({...state, scene: 'GAME'})
  return(
    <div>
      {(function scene(){
        switch(state.scene){
          case 'INIT':
            return(
              <Init
              name={mission.name}
              description={mission.description}
              nameTranslate={ mission.nameTranslate
                //mission.nameTranslate.find((name) => {
                //  return name.language.id === lang;
                //}).name
              }
              descriptionTranslate={ mission.descriptionTranslate
                //mission.descriptionTranslate.find((description) => {
                //  return description.language.id === lang;
                //}).description
              }
              onStart={onStartGame}
              onBack={() => setState({ ...state, back: true })}
              ready={mission.id}
              />
            )
          case 'GAME':
            return(
              <div>
              {state.chooseCharacterScreen &&
                <div>
                  Escolha quem vestir
                  <div>
                    <button onClick={()=> setState({...state, choosenCharacter: 1, cellPhoneStart: true, chooseCharacterScreen: false})}>Personagem 1</button>
                    <button onClick={()=> setState({...state, choosenCharacter: 2, cellPhoneStart: true, chooseCharacterScreen: false})}>Personagem 2</button>
                  </div>
                </div>
              }
              {state.cellPhoneStart &&
                <div>
                  <button onClick={()=>setState({...state, cellPhoneStart: false, dressingContext: true})}>Estou pronto!</button>
                </div>
              }
              {state.dressingContext &&
                <div>
                  {state.showCellphone ?
                    <FullscreenOverlay onClickClose={() => setState({...state, showCellphone: false})}
                      style={{width: '100%', height: '100%', backgroundColor: 'blue', zIndex: 10}}>
                      <Cellphone style={{width: '30%', height: '90%', margin: '2% auto', backgroundColor: 'red', border: '1px solid red'}}>
                        <DialogHistory dialogHistory={[{speaker: '', text: 'stuff'}, {speaker: '', text: 'stuff2'}, {speaker: 'player', text: 'stuff3'}]}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'green'}}>
                          <button>Que dia?</button>
                          <button>Onde?</button>
                          <button>Quando?</button>
                        </div>
                      </Cellphone>
                    </FullscreenOverlay>
                    :
                    <div style={{position: 'absolute', top: '2%', left: '2%'}}>
                      <button onClick={()=>setState({...state, showCellphone: true, dressingContext: true})}>Celular</button>
                    </div>
                  }
                  <div style={{marginTop: '15%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                    <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                      <DressingCharacter clothesTypes={state.clothesTypes}
                        clothes={state.clothes}
                        showRemove
                        onRemoveClick={ index => () => {
                          let clothes = [...state.clothes]
                          clothes[index] = null
                          setState({...state, clothes:clothes})
                        }}
                      />
                    </div>
                    <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                      <Wardrobe style={{border: '1px solid red'}} clothes={mission.clothes}
                          onClothesClick={ item => () =>
                          {
                            var clothes = [...state.clothes]
                            clothes[item.type] = item
                            setState({...state, clothes: clothes})
                          }
                        }
                      />
                    </div>
                  </div>
                  <button onClick={() =>{
                      let clotheCount = state.clothes.reduce((acc, item)=> (item === null ? acc: acc + 1), 0)
                      setState({...state, ready: clotheCount >= 2, readyAlert: clotheCount < 2})
                    }}
                  >
                    Estou pronto!
                  </button>
                  {state.readyAlert &&
                    <div>
                      Não pode sair vestido tão pouco!
                      <button onClick={()=>setState({...state, readyAlert: false})}>Voltar a vestir</button>
                    </div>
                  }
                  {state.ready &&
                    <FullscreenOverlay showCloseBtn={false}
                      style={{width: '100%', height: '100%', backgroundColor: 'blue', zIndex: 10}}
                    >
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                          <DressingCharacter
                            clothesTypes={state.clothesTypes}
                            clothes={state.clothes}
                          />
                        </div>
                        <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                          Esse é seu look ideal?
                          <button onClick={()=>setState({...state, ready: false, dressingContext:false, namingClothesContext: true})}>Sim</button>
                          <button onClick={()=>setState({...state, ready: false})}>Não</button>
                        </div>
                      </div>
                    </FullscreenOverlay>
                  }
                </div>
              }
              {state.namingClothesContext &&
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                    <Cellphone style={{width: '30%', height: '90%', margin: '2% auto', backgroundColor: 'red', border: '1px solid red'}}>
                      <DialogHistory dialogHistory={[{speaker: '', text: 'stuff'}, {speaker: '', text: 'stuff2'}, {speaker: 'player', text: 'stuff3'}]}/>

                      {!state.ready ?
                        <div>
                          <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'green'}}>
                            <button >Que dia?</button>
                            <button>Onde?</button>
                            <button>Quando?</button>
                          </div>

                          <button onClick={() => setState({...state, ready: true})}
                            style={{width: '60%', marginLeft: '-30%', position: 'absolute', bottom: '-5%', left: '50%'}}>
                            Prontinho!
                          </button>
                        </div>
                        :
                        <div>
                          <button onClick={() => setState({...state, lastConfirmation: true, namingClothesContext: false})}>Sim</button>
                          <button>Não</button>
                        </div>
                      }
                    </Cellphone>
                  </div>
                  <div style={{flex: '1 0 0px', border: '1px solid red'}}>
                    <DressingCharacter clothesTypes={state.clothesTypes}
                      clothes={state.clothes}
                    />
                  </div>
                </div>
              }
              {state.lastConfirmation &&
                <div>
                  <Cellphone style={{width: '30%', height: '90%', margin: '2% auto', backgroundColor: 'red', border: '1px solid red'}}>
                    <DressingCharacter clothesTypes={state.clothesTypes}
                      clothes={state.clothes}
                    />
                  </Cellphone>
                  <button onClick={()=>setState({...state, scene: 'END'})}>Next</button>
                </div>
              }
              </div>
            )
          case 'END':
            return(
              <div>
                <div>Tela de feedback</div>
                <Button blink onClick={() => setState(initialState())}>Jogar novamente</Button>
                <Button blink onClick={() => setState({...state, back: true})}>Sair do jogo</Button>
              </div>
            )
          default:
            return(<div>Error</div>)
        }
      }())}
      {state.back && <Redirect to='/userspace'/>}
    </div>
  )
}
/*
<div>
  {!state.selectedClothesName &&
    mission.clothes.map((item, index) =>
    <button key={index} onClick={()=> setState({...state, selectedClothesName: item.name})}>
      {item.name}
    </button>
  )}
  {!state.selectedColor &&
    mission.clothes.map((item, index) =>
    <button key={index} onClick={()=> setState({...state, selectedColor: item.color})}>
      {item.color}
    </button>
  )}
  <div>
    {state.selectedClothesName}
  </div>
  <div>
    {state.selectedColor}
  </div>
</div>

*/
export default Game6
