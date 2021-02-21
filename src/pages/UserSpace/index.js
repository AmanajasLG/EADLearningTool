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
    <div>
      Oi {user.username}!

      <div>
        Jogar jogo 1
        <div>Missões:</div>
        <Link to={'/game1/0'}>Em construção</Link>
      </div>

      <div>
        Jogar jogo 2
        <div>Missões:</div>
        {missions.loading ? <div>Loading...</div> :
          missions && missions.items.map( (mission, index) =>
          <div key={index}>
            <Link to={`/game2/${mission.id}`}>{mission.name}</Link>
          </div>
        )}
      </div>

      <div>
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
      </div>

    </div>
  )
}

export default UserSpace
