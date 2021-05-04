import './index.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { apiActions } from '../../_actions'

const UserSpace = () => {

  const user = useSelector(state => state.authentication.user.user)
  const missions = useSelector( state => state.missions)
  const dispatch = useDispatch()
  const { missionsActions } = apiActions

  React.useEffect(()=>{
    dispatch(missionsActions.getAll())
  }, [dispatch, missionsActions])


  // React.useEffect(()=>{
  //   dispatch(game_1_missionsActions.getAll())
  // }, [dispatch, game_1_missionsActions])

  // React.useEffect(()=>{
  //   dispatch(game_3_missionsActions.getAll())
  // }, [dispatch, game_3_missionsActions])

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

      <div className="jogos">
        <p>Jogos:</p>
        <div id="missoes">
          {missions.loading ? <div>Loading...</div> :
            missions && missions.items.map( (mission, index) =>
            <div key={index} className="missao">
              <Link to={`/game${mission.gameType.game}/${mission.id}`}>
                <div id="imagem"></div>
                <div id="card-text-wrapper">
                  <div id="nome-missao">{mission.name}</div>
                  <div id="descricao">{mission.description}</div>
                  <div id="recompensas">Recompensas</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default UserSpace
