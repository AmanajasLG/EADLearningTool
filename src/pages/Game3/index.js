import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { apiActions } from '../../_actions'

import Button from '@material-ui/core/Button'

import Init from '../Game2/components/Init'
import Timer from './Timer'
import stub from './stub'
import initialState from './initialState'

const goRound = (value, max) => value >= 0 ? value % max : max - (Math.abs(value) % max)

const Game3 = (props) => {
  const [state, setState] = React.useState({...initialState()})
  const dispatch = useDispatch()
  const mission = useSelector( state => state.game_3_missions.items.find( m => m.id === props.match.params.id) )
  const onStartGame = () => {
    setState({...state, scene: 'TUTORIAL'})
  }

  React.useEffect(() =>{
    if(!mission && props.match.params.id){
      dispatch(apiActions.game_3_missionsActions.getById(props.match.params.id))
    }
  }, [dispatch, mission, props.match.params.id])

  const addProduct = (product) => () => setState({...state, cart: [...state.cart, product]})

  const removeProduct = (index) => () => {
    setState({...state,
      cart: [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1)
      ]
    })
  }

  const toPreviousaisle = () => setState(
    {...state,
      currentAisle: goRound(state.currentAisle - 1, mission.aisles.length)
    })


  const toNextaisle = () => setState(
    {...state,
      currentAisle: goRound(state.currentAisle + 1, mission.aisles.length)
    })

  const haveAll = () => {
    for(let i = 0; i < mission.ingredients.length; i++)
        if(!state.cart.find( item => item.name === mission.ingredients[i].name))
          return false
    return true
  }

  const addToPayment = (money) => () => {
    setState({...state, payment: [...state.payment, money]})
  }

  const removeFromPayment = (index) => () => {
    setState({...state, payment: [...state.payment.slice(0, index), ...state.payment.slice(index+1)]})
  }

  const moveToPayment = () => {
    setState({...state, onPayment: true, price: state.cart.reduce( (acc, product) => product.price + acc, 0)})
  }

  const doPayment = () => {
    let updateData = {}
    updateData.paymentAmount = state.payment.reduce( (acc, money) => money.value + acc, 0)
    updateData.change = updateData.paymentAmount - state.price
    setState({...state, ...updateData})
  }

  const receiveChange = () => {
    let updateData = {}
    updateData.scene = 'END_GAME'
    updateData.win = true
    setState({...state, ...updateData})

  }

  //const { mission } = state
  //console.log('mission:', mission)
  return(
    <div>
    { mission ?
    //verificar se é possível generalizar esses gameX-wrapper
    <div id="game2-wrapper">
      {(function renderScene(){
        switch(state.scene){
            case 'INIT':
              return(
                <Init name={mission.name} description={mission.description}
  							onStart={ onStartGame }
  							onBack={ () => setState({...state, back: true}) }
                nameTranlate={'Tradução'}
                descriptionTranlate={'Tradução'}
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
                        {mission.ingredients.map( (ingredient, index) =>
                          <div key={index}>
                            {ingredient.name}
                          </div>
                        )}
                      </div>
                      <button onClick={()=> setState({...state, scene: 'MARKET'})}>
                        Estou pronto
                      </button>
                    </div>
                  </div>
                </div>
              )
            case 'MARKET':
              return(
                <div>
                  <Timer
                    run={state.runTimer} seconds={mission.seconds}
                    onSecondPassed={(remaining) => setState({...state, remainingTime: remaining})}
                    onEnd={() => setState({...state, scene: 'END_GAME', timeUp: true})} />

                  <button onClick={() => setState({...state, shopList: !state.shopList})}>
                    {state.shopList? 'Fechar' : 'Abrir'} lista de compras
                  </button>
                  {!state.checkout &&
                    <div>
                      <div className='Prateleira'>
                        <div>Corredor: {mission.aisles[state.currentAisle].name}</div>
                        {mission.aisles[state.currentAisle].products.map((product, index) =>
                          <button key={index} onClick={addProduct(product)}>{product.name}</button>
                        )}
                      </div>

                      <button className='Voltar' onClick={toPreviousaisle}>
                        Voltar ao corredor {mission.aisles[goRound(state.currentAisle - 1, mission.aisles.length)].name}
                      </button>

                      <button className='Avançar' onClick={toNextaisle}>
                        Ir ao corredor {mission.aisles[goRound(state.currentAisle + 1, mission.aisles.length)].name}
                      </button>

                      <button onClick={() => setState({...state, checkout: true, runTimer: false})}>
                        Ir para o caixa
                      </button>
                    </div>
                  }

                  {state.checkout &&
                    <div>
                      Caixa
                      {haveAll() ?
                        <button onClick={moveToPayment}>
                          Pagar
                        </button>
                        :
                        <div>
                          Está faltando coisa aí!
                          <button onClick={() => setState({...state, checkout: false, runTimer: true})}>Voltar às compras</button>
                        </div>
                      }
                      {state.onPayment &&
                        <div>
                          Hora de pagar! Sua compra deu {Number.parseFloat(state.price).toFixed(2)}
                          <button onClick={doPayment}>
                            Finalizar Compra
                          </button>
                          {state.paymentAmount && state.paymentAmount < state.price &&
                            <div>Opa, pagament insuficiente.</div>
                          }
                          {state.change &&
                            <div className='PopUp'>
                              <div>Seu troco! {state.change}</div>
                              <div>O troco está correto?</div>
                              <button onClick={receiveChange}>Yes</button>
                              <button onClick={receiveChange}>No</button>
                            </div>
                          }
                          <div>
                            {mission.moneyTypes.map( (money, index) =>
                              <Button key={index} onClick={addToPayment(money)}>
                                <img style={{width: 50}} src={money.image.url} alt='money'/>
                              </Button>
                            )}
                          </div>

                          <div>
                          {state.payment.map((money, index) =>
                            <div key={index}>
                              <img style={{width: 50}} src={money.image.url} alt='money'/>
                              <button onClick={removeFromPayment(index)}>Remover</button>
                            </div>
                          )}
                          </div>
                        </div>
                      }
                    </div>
                  }

                  <div className='carrinho'>
                    {state.cart.map((product, index) =>
                      <div key={index}>{product.name}
                        { !state.checkout &&
                          <button onClick={removeProduct(index)}>Remover</button>
                        }
                      </div>
                    )}
                  </div>

                  {state.shopList &&
                    <div className='Lista de compras'>
                        <div>
                          {mission.ingredients.map( (ingredient, index) =>
                            <div key={index}>{ingredient.name}</div>
                          )}
                        </div>
                    </div>
                  }
                </div>
              )
            case 'END_GAME':
              return(
                <div>
                  {state.timeUp &&
                    <div>
                      Seu tempo acabou!
                    </div>
                  }
                  {state.win &&
                    <div>
                      Parabens!! isso e isso deu certo, mas isso e isso deu errado!
                    </div>
                  }
                  <button onClick={()=>setState({...initialState, mission: stub})}>
                    Jogar novamente
                  </button>
                  <Link to={'/userspace'}>
                    Sair do jogo
                  </Link>
                </div>
              )
            default:
              return(
                <div>
                  Erro
                </div>
              )
      }})()}
    {state.back && <Redirect to={'/userspace'} />}
    </div>
    :
    <div>Loading..</div>
    }
    </div>
  )
}

export default Game3
