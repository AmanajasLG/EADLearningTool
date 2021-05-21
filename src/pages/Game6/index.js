import React from 'react'
import { Redirect} from 'react-router-dom'

import initialState from './initialState'
import stub from './stub'
import Init from '../../_components/Init'
import FullscreenOverlay from '../../_components/FullscreenOverlay'
import DressingCharacter from '../../_components/DressingCharacter'
import Wardrobe from '../../_components/Wardrobe'

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
                    <FullscreenOverlay onClickClose={() => setState({...state, showCellphone: false})}>
                      <div>Umas paradas do celular aqui</div>
                      <button onClick={() => setState({...state, dialog: [...state.dialog, mission.day]})}>Que dia?</button>
                      <button>Onde?</button>
                      <button>Quando?</button>
                    </FullscreenOverlay>
                    :
                    <div>
                      <button onClick={()=>setState({...state, showCellphone: true, dressingContext: true})}>Celular</button>
                    </div>
                  }
                  <DressingCharacter clothesTypes={state.clothesTypes}
                    clothes={state.clothes}
                    showRemove
                    onRemoveClick={ index => () => {
                      let clothes = [...state.clothes]
                      clothes[index] = null
                      setState({...state, clothes:clothes})
                    }}
                  />
                  <Wardrobe clothes={mission.clothes}
                    onClothesClick={ item => () =>
                      {
                        var clothes = [...state.clothes]
                        clothes[item.type] = item
                        setState({...state, clothes: clothes})
                      }
                    }
                  />
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
                    <div>
                      Esse é seu look ideal?
                      <button onClick={()=>setState({...state, ready: false, dressingContext:false, namingClothesContext: true})}>Sim</button>
                      <button onClick={()=>setState({...state, ready: false})}>Não</button>
                    </div>
                  }
                </div>
              }
              {state.namingClothesContext &&
                <div>
                  <DressingCharacter clothesTypes={state.clothesTypes}
                    clothes={state.clothes}
                  />

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


                </div>
              }
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

export default Game6
