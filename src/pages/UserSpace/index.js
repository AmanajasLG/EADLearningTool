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
      <div>
        <p>Jogar jogo 1</p>
        <div id="missoes">Missões:
          {missions.loading ? <div>Loading...</div> :
            missions && missions.items.map( (mission, index) =>
            <div key={index}>
              <Link to={`/game/${mission.id}`}>{mission.name}</Link>
            </div>)
          }
        </div>
      </div>

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

    </div>
  )
}

export default UserSpace
