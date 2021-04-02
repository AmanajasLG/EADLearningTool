import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import Init from '../Game2/components/Init'
import Timer from './Timer'
import stub from './stub'
import initialState from './initialState'

const goRound = (value, max) => value >= 0 ? value % max : max - (Math.abs(value) % max)

const Game3 = (props) => {
  const [state, setState] = React.useState({...initialState, mission: stub})

  const onStartGame = () => {
    setState({...state, scene: 'TUTORIAL'})
  }

  const addProduct = (product) => () => setState({...state, cart: [...state.cart, product]})

  const removeProduct = (index) => () => {
    setState({...state,
      cart: [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1)
      ]
    })
  }

  const toPreviousCorridor = () => setState(
    {...state,
      currentCorridor: goRound(state.currentCorridor - 1, mission.corridors.length)
    })


  const toNextCorridor = () => setState(
    {...state,
      currentCorridor: goRound(state.currentCorridor + 1, mission.corridors.length)
    })

  const haveAll = () => {
    var i
    for(i = 0; i < mission.ingredients.length; i++)
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

  const doPayment = () => {
    setState({...state, scene: 'END_GAME', win: true})
  }

  const { mission } = state
  return(
    //verificar se é possível generalizar esses gameX-wrapper
    <div id="game2-wrapper">
      {(function renderScene(){
        switch(state.scene){
            case 'INIT':
              return(
                <Init name={mission.name} description={mission.description}
  							onStart={ onStartGame }
  							onBack={ () => setState({...state, back: true}) }
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
                  <Timer seconds={30} /* onEnd={()=>setState({...state, scene: 'END_GAME', timeUp: true})}*//>
                  <button onClick={() => setState({...state, shopList: !state.shopList})}>
                    {state.shopList? 'Fechar' : 'Abrir'} lista de compras
                  </button>
                  {!state.checkout &&
                    <div>
                      <div className='Prateleira'>
                        <div>Corredor: {mission.corridors[state.currentCorridor].name}</div>
                        {mission.corridors[state.currentCorridor].shelveProducts.map((product, index) =>
                          <button key={index} onClick={addProduct(product)}>{product.name}</button>
                        )}
                      </div>

                      <button className='Voltar' onClick={toPreviousCorridor}>
                        Voltar ao corredor {mission.corridors[goRound(state.currentCorridor - 1, mission.corridors.length)].name}
                      </button>

                      <button className='Avançar' onClick={toNextCorridor}>
                        Ir ao corredor {mission.corridors[goRound(state.currentCorridor + 1, mission.corridors.length)].name}
                      </button>

                      <button onClick={()=>setState({...state, checkout: true})}>
                        Ir para o caixa
                      </button>
                    </div>
                  }

                  {state.checkout &&
                    <div>
                      Caixa
                      {haveAll() ?
                        <button onClick={()=> setState({...state, onPayment: true})}>
                          Pagar
                        </button>
                        :
                        <div>
                          Está faltando coisa aí!
                          <button onClick={() => setState({...state, checkout: false})}>Voltar às compras</button>
                        </div>
                      }
                      {state.onPayment &&
                        <div>
                          Hora de pagar

                          <button onClick={doPayment}>
                            Finalizar Compra
                          </button>
                          <div>
                            {mission.moneyTypes.map( (money, index) =>
                              <Button key={index} onClick={addToPayment(money)}><img src={money.url} alt='money'/></Button>
                            )}
                          </div>

                          <div>
                          {state.payment.map((money, index) =>
                            <div key={index}><img src={money.url} alt='money'/><button onClick={removeFromPayment(index)}>Remover</button></div>
                          )}
                          </div>
                        </div>
                      }
                    </div>
                  }

                  <div className='carrinho'>
                    {state.cart.map((product, index) =>
                      <div key={index}>{product.name} <button onClick={removeProduct(index)}>Remover</button></div>
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
  )
}

export default Game3
