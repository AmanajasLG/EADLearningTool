import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'
import DressingCharacter from '../../_components/DressingCharacter'
import Wardrobe from '../../_components/Wardrobe'



import initialState from './initialState'

import stub from './stub'

const Game5 = () => {
  const [state, setState] = React.useState(initialState())
  const mission = stub

  const onStartGame = () => setState({...state, scene: 'GAME'})

  return(
    <div>
      {(function scene(){
        switch(state.scene){
          case 'INIT':
          return (
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
                      <button onClick={()=> setState({...state, choosenCharacter: 1, showInvitation: true, chooseCharacterScreen: false})}>Personagem 1</button>
                      <button onClick={()=> setState({...state, choosenCharacter: 2, showInvitation: true, chooseCharacterScreen: false})}>Personagem 2</button>
                    </div>
                  </div>
                }
                {state.showInvitation &&
                  <div>
                    <div>{mission.invitation.text}</div>
                    <div>{mission.invitation.season}</div>
                    <div>{mission.invitation.date}</div>
                    <div>{mission.invitation.time}</div>
                    <div>
                      <button onClick={()=>setState({...state, proceedToDressingConfirmation: true, showInvitation: false})}>Estou pronto!</button>
                    </div>
                  </div>
                }
                {state.proceedToDressingConfirmation &&
                  <div>
                    <div>Tem certeza?</div>
                    <div>ocê terá apenas uma (1) chance de rever cada informação do convite</div>
                    <div>Deseja continuar?</div>
                    <button onClick={()=>setState({...state, proceedToDressingConfirmation: false, showInvitation: true})}>Ver o convite novamente</button>
                    <button onClick={()=>setState({...state, proceedToDressingConfirmation: false, dressingContext: true})}>Estou pronto(a)!</button>
                  </div>
                }
                {state.dressingContext &&
                  <div>
                    <DressingCharacter clothesTypes={state.clothesTypes} clothes={state.clothes}
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
                        <button onClick={()=>setState({...state, ready: false, scene: "END"})}>Sim</button>
                        <button onClick={()=>setState({...state, ready: false})}>Não</button>
                      </div>
                    }
                  </div>
                }
              </div>
            )
          case "END":
            return(
              <div>
                Fim de jogo! altos feedbacks.
                <button onClick={() => setState(initialState())}>Jogar novamente</button>
                <button onClick={() => setState({...state, back: true})}>Sair</button>
              </div>
            )
          default:
            return(<div>Error</div>)
        }
      })()}

      {state.back && <Redirect to='/userspace' />}
    </div>
  )
}

export default Game5