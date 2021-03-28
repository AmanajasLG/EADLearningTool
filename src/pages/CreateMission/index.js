import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Button from '@material-ui/core/Button'

import Character from '../Character'
import CreateCharacter from '../CreateCharacter'
import CreateLocation from '../CreateLocation'
import Question from '../Question'
import CreateQuestion from '../CreateQuestion'

import { apiActions } from '../../_actions'

const CreateMissionGame1 = (props) => {
  const dispatch = useDispatch()

  //for edit
  const game = props && props.match? props.match.params.game : null
  const id = props && props.match ? props.match.params.id : null
  const originalMission = useSelector( state => id && state[game].items.length > 0 ? state[game].items.filter(m => m.id === id)[0] : null )

  const characters = useSelector( state => state.characters)
  const locations = useSelector( state => state.locations)
  const questions = useSelector( state => state.questions)

  const [state, setState] = React.useState({
    mission: {
      name: '',
      description: '',
      characters: [],
      locations: [],
      questions:[]
    },
    characterDetails: null
  })

  //for edit
  if(originalMission && !state.mission.id)
    setState({...state, mission: {...originalMission}})

  //refrashed route
  React.useEffect(() => {
    if(id && !originalMission)
      dispatch(apiActions[game+"Actions"].getById(id))
    if(characters.items.length === 0)
      dispatch(apiActions.charactersActions.getAll())
    if(locations.items.length === 0)
      dispatch(apiActions.locationsActions.getAll())
    if(questions.items.length === 0)
      dispatch(apiActions.questionsActions.getAll())
  }, [dispatch, id, originalMission, questions.items.length, locations.items.length, characters.items.length, game])

  const [createCharacter, setCreateCharacter] = React.useState(false)
  const [createLocation, setCreateLocation] = React.useState(false)
  const [createQuestion, setCreateQuestion] = React.useState(false)

  const createMission = () => {
    let data = {...state.mission}
    dispatch(apiActions[game+"Actions"].create(data))
  }

  const editMission = () => {
    let data = {...state.mission}
    dispatch(apiActions[game+"Actions"].update(data))
  }

  const addToMission = (type, data) => () => {
    setState({...state, mission: {...state.mission, [type]:[...state.mission[type], data]}})
  }

  const removeFromMission = (type, data) => () => {
    setState({...state, mission: {...state.mission, [type]: state.mission[type].filter(d => d.id !== data.id)}})
  }

  const viewDetails = (character) => () => {
    setState({...state, characterDetails: character})
  }

  return(
    <div>
      <div style={{
          display: 'flex', flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          flexDirection: 'row'}}>
        <div>
          <div>
            <div>Nome:</div>
            <div>
              <input type='text' value={state.mission.name} onChange={e => setState({...state, mission: {...state.mission, name: e.target.value}})} placeholder='Missão maneira'/>
            </div>
          </div>

          <div>Texto da missão:</div>
          <textarea value={state.mission.description} onChange={e => setState({...state, mission: {...state.mission, description: e.target.value}})} />
          <div>
            {id ?
              <Button onClick={editMission}>{'Salvar Missão'}</Button>
              :<Button onClick={createMission}>{'Criar Missão'}</Button>
            }
          </div>

          <div>
            <div>Personagens na missão:</div>
            {state.mission.characters.map( ( character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeFromMission('characters', character)}><RemoveIcon /></Button>
                <Button onClick={viewDetails(character)}>
                  {character.name}
                </Button>
              </div>
            )}
          </div>

          <div>
            <div>Locais na missão:</div>
            {state.mission.locations.map((location, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeFromMission('locations', location)}><RemoveIcon /></Button>
                <div>{location.name}</div>
              </div>
            )}
          </div>

          <div>
            <div>Questions:</div>
            {state.mission.questions.map((question, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeFromMission('questions', question)}><RemoveIcon /></Button>
                <Question question={question}/>
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <div>Personagens disponíveis</div>
            {characters.items && characters.items.length > 0 && characters.items
              .filter( character => !state.mission.characters.find( c => c.id === character.id) )
              .map( (character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addToMission('characters', character)}>
                  <AddIcon />
                </Button>
                <Button onClick={viewDetails(character)}>
                  {character.name}
                </Button>
              </div>
            )}
            <Button onClick={() => setCreateCharacter(!createCharacter)}>
              {createCharacter ? "Cancelar" : "Criar personagem"}
            </Button>
            {createCharacter && <CreateCharacter /> }
          </div>

          <div>
            <div>Locais disponíveis</div>
            {locations.items && locations.items.length > 0 && locations.items
              .filter( location => !state.mission.locations.find( l => l.id === location.id) )
              .map( (location, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addToMission('locations', location)}>
                  <AddIcon />
                </Button>
                <div>{location.name}</div>
              </div>
            )}
            <Button onClick={() => setCreateLocation(!createLocation)}>
            {createLocation ? "Cancelar" : "Criar local"}
            </Button>
            {createLocation && <CreateLocation />}
          </div>

          <div>
            <div>Preset questions</div>
            {questions.items && questions.items.length > 0 && questions.items
              .filter( question => !state.mission.questions.find( c => c.id === question.id) )
              .map( (question, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addToMission('questions', question)}>
                  <AddIcon />
                </Button>
                <Question question={question}/>
              </div>
            )}
            <Button onClick={() => setCreateQuestion(!createQuestion)}>
              {createQuestion ? "Cancel" : "Create question"}
            </Button>
            {createQuestion && <CreateQuestion /> }
          </div>
        </div>

        <div>
          <h5>Detalhes do personagem:</h5>
          {state.characterDetails && <Character character={state.characterDetails}/>}
        </div>

      </div>

    </div>
  )
}

export default CreateMissionGame1
