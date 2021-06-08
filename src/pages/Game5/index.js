import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'
import DressingCharacter from '../../_components/DressingCharacter'
import Wardrobe from '../../_components/Wardrobe'
import Button from '../../_components/Button'
import { BlobBg } from '../../_components/Blob'
import { renderToStaticMarkup } from 'react-dom/server'



import initialState from './initialState'

import stub from './stub'

const Game5 = () => {
  const [state, setState] = React.useState(initialState())
  const mission = stub

  const onStartGame = () => setState({...state, scene: 'GAME'})

  return(
    <React.Fragment>
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
              <React.Fragment>

                {state.chooseCharacterScreen &&
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '100%'}}>
                    <img src={mission.char1} style={{height: '50%', cursor: 'pointer'}}
                      onClick={() => setState(s => ({...s, choosenCharacter: 1, showInvitation: true, chooseCharacterScreen: false}) )} alt="Personagem 1"
                    />
                    <img src={mission.char2} style={{height: '50%', cursor: 'pointer'}}
                      onClick={() => setState(s => ({...s, choosenCharacter: 2, showInvitation: true, chooseCharacterScreen: false}) )} alt="Personagem 2"
                    />
                  </div>
                }

                {state.showInvitation &&
                  <div style={{position: 'absolute', bottom: 0, width: '50%', height: '50%', left: '25%',
                    backgroundColor: 'var(--color-second)',  textAlign: 'center'}}>

                    <div style={{position: 'absolute', backgroundColor: 'white', width: '50%', left: '25%', fontSize: '3em'}}>
                      <div>{mission.invitation.text}</div>
                      <div>{mission.invitation.season}</div>
                      <div>{mission.invitation.date}</div>
                      <div>{mission.invitation.time}</div>
                    </div>

                    <Button style={{position: 'relative', bottom: '10%', margin: '50% auto 0% auto'}}
                      onClick={() => setState(s => ({...s, proceedToDressingConfirmation: true, showInvitation: false}) )}>
                      Estou pronto!
                    </Button>
                  </div>
                }

                {state.proceedToDressingConfirmation &&
                  <BlobBg style={{postion: 'relative', width: '50%', height: '50%', margin: '0 auto', paddingTop: '7%', textAlign: 'center', fontSize: '3em', zIndex: 1}}>
                    <div style={{width: '50%', height: '50%', margin: '0 auto'}}>
                      <div>Tem certeza?</div>
                      <div>você terá apenas UMA chance de rever cada informação do convite</div>
                      <div>Deseja continuar?</div>
                      <button onClick={() => setState(s => ({...state, proceedToDressingConfirmation: false, showInvitation: true}) )}>
                        Ver o convite
                      </button>
                      <button onClick={() => setState(s => ({...state, proceedToDressingConfirmation: false, dressingContext: true}) )}>
                        Estou pronto(a)!
                      </button>
                    </div>
                  </BlobBg>
                }

                {state.dressingContext &&
                  <div>
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
                      <div>
                        Esse é seu look ideal?
                        <button onClick={()=>setState({...state, ready: false, scene: "END"})}>Sim</button>
                        <button onClick={()=>setState({...state, ready: false})}>Não</button>
                      </div>
                    }
                  </div>
                }
              </React.Fragment>
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
    </React.Fragment>
  )
}

export default Game5
