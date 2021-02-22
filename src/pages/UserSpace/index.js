import './index.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { apiActions } from '../../_actions'

const UserSpace = () => {
  React.useEffect(()=>{
    dispatch(missionsActions.getAll())
  }, [])

  const user = useSelector(state => state.authentication.user.user)
  const missions = useSelector( state => state.missions)
  const dispatch = useDispatch()
  const { missionsActions } = apiActions

  return(
    <div id="userspace">
      <p>Oi {user.username}!</p>
      <div id="area-criacao">
        Área de criação
        <div>
          <Link to='/missions'>Ver Missões</Link>
        </div>

        <div>
          <Link to='/characters'>Personagens</Link>
        </div>

        <div>
          <Link to='/questions'>Perguntas</Link>
        </div>
      </div>

      <div id="jogos">
        <p>Jogar jogo 1</p>
        <p>Missões:</p>
        <div id="missoes">
          {missions.loading ? <div id="loading">Loading...</div> :
            missions && missions.items.map( (mission, index) =>
            <div key={index} class="missao">
              <Link to={`/game/${mission.id}`}>
                <div id="imagem"></div>
                <div id="card-text-wrapper">
                  <div id="nome-missao">{mission.name}</div>
                  <div id="descricao">Descrição</div>
                  <div id="recompensas">Recompensas</div>
                </div>
              </Link>
            </div>)
          }
        </div>
      </div>

    </div>
  )
}

export default UserSpace
