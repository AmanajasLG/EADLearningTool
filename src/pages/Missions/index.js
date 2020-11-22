import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { apiActions } from '../../_actions'

import Button from '@material-ui/core/Button'

import Mission from '../Mission'
import CreateMission from '../CreateMission/Game1'

const Missions = () => {
  const { missionActions } = apiActions
  const dispatch = useDispatch()
  const missions = useSelector( state => state.missions)
  const [ createMission, setCreateMission ] = React.useState(false)

  React.useEffect(() => {
    dispatch(missionActions.getAll())
  }, [])

  return(
    <div>
      {missions.items && missions.items.length > 0 && missions.items.map((mission, index) =>
        <Mission key={index} mission={mission} />
      )}
      <Button onClick={() => setCreateMission(!createMission)}>
        {createMission? 'Cancelar' : 'Criar Missão'}
      </Button>
      {createMission &&  <CreateMission />}
    </div>
  )
}

export default Missions
