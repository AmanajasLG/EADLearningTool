import './index.scss'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { apiActions } from '../../_actions'

const UserSpace = () => {


  const user = useSelector(state => state.authentication.user.user)
  const missions = useSelector( state => state.missions)
  const game1missions = useSelector( state => state.game_1_missions)
  const game3missions = useSelector( state => state.game_3_missions)
  const dispatch = useDispatch()
  const { missionsActions, game_1_missionsActions, game_3_missionsActions } = apiActions


  React.useEffect(()=>{
    dispatch(missionsActions.getAll())
  }, [dispatch, missionsActions])

  React.useEffect(()=>{
    dispatch(game_1_missionsActions.getAll())
  }, [dispatch, game_1_missionsActions])

    React.useEffect(()=>{
      dispatch(game_3_missionsActions.getAll())
    }, [dispatch, game_3_missionsActions])

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
        <div>
          <Link to='/questionnaires'>Questionnaires</Link>
        </div>
        <div>
          <Link to='/playSessions'>Ver PlaySessions</Link>
        </div>
      </div>

      <div className="jogos">
        <p>Jogar jogo 1</p>
        <p>Missões:</p>
        <div id="missoes">
          {game1missions.loading ? <div id="loading">Loading...</div> :
            game1missions && game1missions.items.map( (mission, index) =>
            <div key={index} className="missao">
              <Link to={`/game1/${mission.id}`}>
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

      <div className="jogos">
        <p>Jogar jogo 2</p>
        <p>Missões:</p>
        <div id="missoes">
          {missions.loading ? <div>Loading...</div> :
            missions && missions.items.map( (mission, index) =>
            <div key={index} className="missao">
              <Link to={`/game2/${mission.id}`}>
                <div id="imagem"></div>
                <div id="card-text-wrapper">
                  <div id="nome-missao">{mission.name}</div>
                  <div id="descricao">Descrição</div>
                  <div id="recompensas">Recompensas</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="jogos">
        <p>Jogar jogo 3</p>
        <p>Missões:</p>
        <Link to={'/game3/0'}>Stub</Link>
        <div id="missoes">
          {game3missions.loading ? <div id="loading">Loading...</div> :
            game3missions && game3missions.items.map( (mission, index) =>
            <div key={index} className="missao">
              <Link to={`/game3/${mission.id}`}>
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

      <div className="jogos">
        <p>Jogar jogo 4</p>
        <p>Missões:</p>
        <Link to={'/game4/0'}>Stub</Link>
        {/*
        <div id="missoes">
          {game3missions.loading ? <div id="loading">Loading...</div> :
            game3missions && game3missions.items.map( (mission, index) =>
            <div key={index} className="missao">
              <Link to={`/game3/${mission.id}`}>
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
        */}
      </div>

    </div>
  )
}

export default UserSpace
