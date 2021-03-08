import React from 'react'
import { apiActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'

const PlaySessions = () => {
  const dispatch = useDispatch()
  const playSessions = useSelector( state => state.play_sessions.items)
  const { play_sessionsActions } = apiActions

  React.useEffect(() => {
    dispatch(play_sessionsActions.getAll())
  }, [dispatch, play_sessionsActions])

  return(
    <div>
      <div>PlaySessions:</div>
      {playSessions.length > 0 && playSessions.map((playSession, index) =>
        <div key={index}>
          <div>User: {playSession.usersPermissionsUser.firstName} {playSession.usersPermissionsUser.lastName}</div>
          <div>Missão: {playSession.mission.name}</div>
          <div>
          <div>PlayerActions:</div>
          {playSession.player_actions.map((playerAction, index) =>
            <div key={index}>TAG:{playerAction.data.tag}</div>
          )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaySessions
