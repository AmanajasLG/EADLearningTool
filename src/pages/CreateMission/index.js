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


const CreateMissionGame1 = () => {
  const [state, setState] = React.useState({
    name:'',
    description:''
  })
  const [charList, setCharList] = React.useState([])
  const [locationList, setLocationList] = React.useState([])
  const [questionList, setQuestionList] = React.useState([])

  const [createCharacter, setCreateCharacter] = React.useState(false)
  const [createLocation, setCreateLocation] = React.useState(false)
  const [createQuestion, setCreateQuestion] = React.useState(false)

  const dispatch = useDispatch()
  const characters = useSelector( state => state.characters)
  const locations = useSelector( state => state.locations)
  const questions = useSelector( state => state.questions)
  const { missionsActions, charactersActions, questionsActions } = apiActions

  const createMission = () => {
    let data = {...state,
      characters: charList.reduce((acc,  item) => [...acc, item.id], [] ),
      locations: locationList.reduce((acc, item) => [...acc, item.id], [] ),
      questions: questionList.reduce((acc, item) => [...acc, item.id], [] )
    }
    dispatch(missionsActions.create(data))
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

  return(
    <div>
      <div>
        Nome da missão:
        <input type='text' value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder='Missão maneira'/>
      </div>
      <div>
        Texto da missão:
        <input type='text' value={state.description} onChange={e => setState({...state, description: e.target.value})} />
      </div>
      <Button onClick={createMission}>Criar Missão</Button>

      <div>
        <h2>Personagens na missão:</h2>
        {charList.map( ( character, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeFromMission(character)}><RemoveIcon /></Button>
            <Character character={character}/>
          </div>
        )}
      </div>

      <div>
        <h3 class="characters">Personagens disponíveis</h3>
        {characters.items && characters.items.length > 0 && characters.items
          .filter( character => !charList.find( c => c.id === character.id) )
          .map( (character, index) =>
          <div class="character" key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={addToMission(character)}>
              <AddIcon />
            </Button>
            <Character character={character}/>
          </div>
        )}
        <Button onClick={() => setCreateCharacter(!createCharacter)}>
          {createCharacter ? "Cancelar" : "Criar personagem"}
        </Button>
        {createCharacter && <CreateCharacter /> }
      </div>

      <div>
        <h2>Locais na missão:</h2>
        {locationList.map((location, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeLocationFromMission(location)}><RemoveIcon /></Button>
            <div>{location.name}</div>
          </div>
        )}
      </div>

      <div>
        <h3>Locais disponíveis</h3>
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
        <h2>Questions:</h2>
        {questionList.map( ( question, index) =>
          <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Button onClick={removeQuestionFromMission(question)}><RemoveIcon /></Button>
            <Question question={question}/>
          </div>
        )}
      </div>

      <div>
        <h3>Preset questions</h3>
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
  )
}

export default CreateMissionGame1
