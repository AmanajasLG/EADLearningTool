import React from 'react'
import { Link } from 'react-router-dom'

import Init from '../Game2/components/Init'
import Timer from '../Game3/Timer'

import stub from './stub'
import initialState from './initialState'

const shuffle = (word) => {
  let copy = word.slice(0)
  let shuffled = []
  while(copy.length > 0){
    let index = (Math.trunc(Math.random()*100)) % copy.length
    shuffled.push(copy[ index ])
    copy = copy.slice(0, index) + copy.slice(index+1)
  }
  return shuffled
}

const Game4 = () => {
  const [state, setState] = React.useState(initialState())
  const mission = stub
  const onStartGame = () => setState({...state, scene: 'TUTORIAL'})
  const onSecondPassed = remaining => setState( state => { return {...state, remainingTime: remaining} })
  const onTimeEnd = () => setState({...state, scene: 'END_GAME', timeUp: true})

  return(
    <div>
      {(function renderScene(){
        switch(state.scene){
          case 'INIT':
            return (
              <Init
                name={mission.name}
                description={mission.description}
                onStart={ onStartGame }
                onBack={() => setState({...state, back: true})}
                onSeeTutorial={ state.hasPlayed ? () => { setState({...state, seeTutorial: true}); onStartGame()} : null }
              />
            )
          case 'TUTORIAL':
            return(
              <div>
                Tutorial
                <div>
                  Apresentador
                </div>
                <div>
                  Fala
                  <div>
                    Receita
                    <div>
                      {mission.recipe.map( (ingredient, index) =>
                        <div key={index}>
                          {ingredient.name}
                        </div>
                      )}
                    </div>
                    <button onClick={()=> setState({...state, scene: 'GAME'})}>
                      Estou pronto
                    </button>
                  </div>
                </div>
              </div>
            )
          case 'GAME':
            return(
              <div>
                <Timer
                  run={state.runTimer} seconds={mission.seconds}
                  onSecondPassed={onSecondPassed}
                  onEnd={onTimeEnd}
                />
                {state.cook?
                  <div>
                    <div>
                      {state.shuffled.map((letter, index) =>
                        <button key={index} onClick={() =>
                          setState({...state,
                            orderedLetters: [...state.orderedLetters, letter],
                            shuffled: [...state.shuffled.slice(0, index), ...state.shuffled.slice(index+1)]
                          })}>
                            {letter}
                        </button>
                      )}
                    </div>
                    <div>
                      {state.shuffled.length === 0  &&
                        (state.orderedLetters.reduce( (acc, letter) => acc + letter, '') === state.selected.name ?
                        <div>Acertou!</div>
                        :<div>Errou! :(</div>)
                      }
                      <button onClick={()=> setState({...state, orderedLetters: [], shuffled: shuffle(state.selected.name)})}>
                        Clear
                      </button>
                      {state.orderedLetters.map((letter, index) =>
                        <span key={index}>-{letter}-</span>
                      )}
                    </div>
                  </div>
                  :
                  <div>
                    {mission.ingredients.map( (item, index) =>
                      <button key={index} onClick={ e => setState({...state, selected: item})}>{item.name}</button>
                    )}
                  </div>
                }
                  <div>
                    Mesa
                    <div>
                      {state.selected &&
                        (function showTable(){
                          let item = mission.recipe.find( item => item.name === state.selected.name)
                          if(item)
                            return(
                              <div>
                                {item.name}
                                {!state.cook &&
                                  <button onClick={()=> setState({...state, cook: true, shuffled: shuffle(item.name)})}>Preparar</button>
                                }
                              </div>
                            )
                          else
                            return(
                              <div>
                                {item.name}
                                <div>Não faz parte da receita! :(</div>
                                <button onClick={() => setState({...state, selected: null})}>Remover</button>
                              </div>
                            )
                        })()
                      }
                    </div>
                  </div>
              </div>
            )
          case 'END_GAME':
            return(
              <div>Acabou o tempo!
                <button onClick={() => setState(initialState())}>Jogar de novo</button>
                <Link to={'/userspace'}>
                  Sair do jogo
                </Link>
              </div>
            )
          default:
            return (<div>Error</div>)
        }
      })()}
    </div>
  )
}

export default Game4
