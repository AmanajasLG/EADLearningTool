import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { apiActions } from '../../_actions'

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'

import Mission from '../Mission'
import EditMission from '../EditMission'

const Missions = () => {
  const { missionsActions, game_1_missionsActions } = apiActions
  const dispatch = useDispatch()
  const missions = useSelector( state => state.missions)
  const game1missions = useSelector( state => state.game_1_missions)
  const [ createMission, setCreateMission ] = React.useState(false)
  const [ edit, setEdit ] = React.useState(-1)

  React.useEffect(()=> {
    setEdit(-1)
    setCreateMission(false)
  }, [missions])

  React.useEffect(() => {
    dispatch(game_1_missionsActions.getAll())
  }, [dispatch, game_1_missionsActions])

  React.useEffect(() => {
    dispatch(missionsActions.getAll())
  }, [dispatch, missionsActions])

  return(
    <div>
      <div>
        <div>Missões jogo 1</div>
        {game1missions.items && game1missions.items.length > 0 && game1missions.items.map((mission, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            {edit !== index ?
              <Mission key={index} mission={mission} />
              : <EditMission mission={mission} onDone={(newState) => {
                  setEdit(-1)
                  dispatch(game_1_missionsActions.update(newState))
                }} /> }

            {edit !== index ?
              <Button><Link to={`missions/edit/game_1_missions/${mission.id}`}><EditIcon/></Link></Button>
              : <Button onClick={() => setEdit(-1) }><CancelIcon/></Button>
             }

            <Button onClick={() => dispatch(game_1_missionsActions.delete(mission.id))}><DeleteIcon/></Button>
          </div>
        )}
        <Button onClick={() => setCreateMission(!createMission)}>
          {createMission? 'Cancelar' : 'Criar Missão'}
        </Button>
        {createMission &&  <Redirect to='missions/create'/>}
      </div>
      <div>
        <div>Missões jogo 2</div>
        {missions.items && missions.items.length > 0 && missions.items.map((mission, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            {edit !== index ?
              <Mission key={index} mission={mission} />
              : <EditMission mission={mission} onDone={(newState) => {
                  setEdit(-1)
                  dispatch(missionsActions.update(newState))
                }} /> }

            {edit !== index ?
              <Button><Link to={`missions/edit/${mission.id}`}><EditIcon/></Link></Button>
              : <Button onClick={() => setEdit(-1) }><CancelIcon/></Button>
             }

            <Button onClick={() => dispatch(missionsActions.delete(mission.id))}><DeleteIcon/></Button>
          </div>
        )}
        <Button onClick={() => setCreateMission(!createMission)}>
          {createMission? 'Cancelar' : 'Criar Missão'}
        </Button>
        {createMission &&  <Redirect to='missions/create'/>}
      </div>
    </div>
  )
}

export default Missions
