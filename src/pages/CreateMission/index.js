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
  const id = props && props.match ? props.match.params.id : null
  const dispatch = useDispatch()
  const mission = useSelector( state => id && state.missions.items.length > 0 ? state.missions.items.filter(m => m.id == id)[0] : null )
  const characters = useSelector( state => state.characters)
  const locations = useSelector( state => state.locations)
  const questions = useSelector( state => state.questions)

  const [state, setState] = React.useState({
    mission: {name: '', description: ''},
    characterDetails: null
  })

  if(mission && state.mission.name == '') setState({...state, mission: mission})

  React.useEffect(() => {
    if(id && !mission)
      dispatch(apiActions.missionsActions.getById(id))
    if(characters.items.length == 0)
      dispatch(apiActions.charactersActions.getAll())
    if(locations.items.length == 0)
      dispatch(apiActions.locationsActions.getAll())
    if(questions.items.length == 0)
      dispatch(apiActions.questionsActions.getAll())
  }, [])

  const [charList, setCharList] = React.useState([])
  const [locationList, setLocationList] = React.useState([])
  const [questionList, setQuestionList] = React.useState([])

  const [createCharacter, setCreateCharacter] = React.useState(false)
  const [createLocation, setCreateLocation] = React.useState(false)
  const [createQuestion, setCreateQuestion] = React.useState(false)

  const createMission = () => {
    let data = {...state,
      characters: charList.reduce((acc,  item) => [...acc, item.id], [] ),
      locations: locationList.reduce((acc, item) => [...acc, item.id], [] ),
      questions: questionList.reduce((acc, item) => [...acc, item.id], [] )
    }
    dispatch(apiActions.missionsActions.create(data))
  }

  const addToMission = (character) => () => {
    setCharList([...charList, character])
  }

  const removeFromMission = (character) => () => {
    setCharList(charList.filter(c => c.id !== character.id))
  }

  const addLocationToMission = (location) => () => {
    setLocationList([...locationList, location])
  }

  const removeLocationFromMission = (location) => () => {
    setLocationList(locationList.filter(c => c.id !== location.id))
  }

  const addQuestionToMission = (question) => () => {
    setQuestionList([...questionList, question])
  }

  const removeQuestionFromMission = (question) => () => {
    setQuestionList(questionList.filter(c => c.id !== question.id))
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
            <Button onClick={createMission}>{id ? 'Salvar Missão' : 'Criar Missão'}</Button>
          </div>

          <div>
            <div>Personagens na missão:</div>
            {charList.map( ( character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeFromMission(character)}><RemoveIcon /></Button>
                <Button onClick={viewDetails(character)}>
                  {character.name}
                </Button>
              </div>
            )}
          </div>

          <div>
            <div>Locais na missão:</div>
            {locationList.map((location, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeLocationFromMission(location)}><RemoveIcon /></Button>
                <div>{location.name}</div>
              </div>
            )}
          </div>

          <div>
            <div>Questions:</div>
            {questionList.map( ( question, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeQuestionFromMission(question)}><RemoveIcon /></Button>
                <Question question={question}/>
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <div>Personagens disponíveis</div>
            {characters.items && characters.items.length > 0 && characters.items
              .filter( character => !charList.find( c => c.id === character.id) )
              .map( (character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addToMission(character)}>
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
              .filter( location => !locationList.find( l => l.id === location.id) )
              .map( (location, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addLocationToMission(location)}>
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
              .filter( question => !questionList.find( c => c.id === question.id) )
              .map( (question, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addQuestionToMission(question)}>
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
