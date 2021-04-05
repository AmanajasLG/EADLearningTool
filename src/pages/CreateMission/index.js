import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Button from '@material-ui/core/Button'

import CreateCharacter from '../CreateCharacter'
import CreateLocation from '../CreateLocation'
import Question from '../Question'
import CreateQuestion from '../CreateQuestion'
import EditMissionCharacter from './components/EditMissionCharacter'
import EditNewMissionCharacter from './components/EditNewMissionCharacter'
import missionCharacterInitialState from './missionCharacterInitialState'

// import { useAlert } from 'react-alert'

import CreateGame1Data from './Game1Data'
import Game2Data from './Game2Data'

import { apiActions } from '../../_actions'

//used for game 1 and 2 coincident data
const CreateMissionGame1 = (props) => {
  const dispatch = useDispatch()
  // const alert = useAlert()

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
      missionCharacters: [],
      locations: [],
      questions:[]
    },
    charactersList: [],
    charactersConfigList: [],
    characterConfig: null,
    newCharacterConfig: null,
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
    let data = {...state.mission,
      missionCharacters: state.mission.missionCharacters.map(missionCharacter => {
        return missionCharacter.id
      }),
      missionCharactersCreate: [...state.charactersConfigList, ...state.charactersList]
    }


/*
//  algo muito errado aqui
//
    state.charactersConfigList = []
    state.charactersList = []

    dispatch(apiActions.missionsActions.create(data))

    let data = {...state.mission}
    dispatch(apiActions[game+"Actions"].create(data))
  */
  }

  const editMission = () => {
    // state.mission.missionCharacters = [...state.mission.missionCharacters]
    // state.charactersConfigList = []
    // state.charactersList = []
    let data = {...state.mission,
      missionCharacters: state.mission.missionCharacters.map(missionCharacter => {
        return missionCharacter.id
      }),
      missionCharactersCreate: [...state.charactersConfigList, ...state.charactersList]
    }

/*
//  algo errado aqui
// 
    state.charactersConfigList = []
    state.charactersList = []

    dispatch(apiActions.missionsActions.update(data))

    let data = {...state.mission}
    dispatch(apiActions[game+"Actions"].update(data))
*/
  }

  const addToMission = (type, data) => () => {
    setState({...state, mission: {...state.mission, [type]:[...state.mission[type], data]}})
  }

  const removeFromMission = (type, data) => () => {
      setState({...state, mission: {...state.mission, [type]: state.mission[type].filter(d => d.id !== data.id)}})
  }

  const editCharacterConfig = (character) => () => {
    setState({...state, characterConfig: character})
  }

  const createCharacterConfig = (character) => () => {
    setState({...state, newCharacterConfig: character})
  }

  const cancelCharacterConfig = () => () => {
    setState({...state, characterConfig: null, newCharacterConfig: null})
  }

  const addCharacterToList = (character) => () => {
    setState({...state, charactersList: [...state.charactersList, missionCharacterInitialState(character)]})
  }

  const removeCharacterFromList = (character) => () => {
    setState({...state, charactersList: state.charactersList.filter(d => d.character.id !== character.character.id)})
  }

  const removeCharacterFromConfigList = (character) => () => {
    setState({...state, charactersConfigList: state.charactersList.filter(d => d.character.id !== character.character.id)})
  }

  const updateCharacterConfig = (character) => () => {
    dispatch(apiActions.mission_charactersActions.update(character))
    setState({...state, characterConfig: null})
  }

  const addCharacterConfig = (missionCharacter) => () => {
    setState({...state, charactersConfigList: [...state.charactersConfigList, missionCharacter], charactersList: state.charactersList.filter(d => d.character.id !== missionCharacter.character.id), newCharacterConfig: null})
  }

  console.log(state)

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
            {state.mission.missionCharacters.map( ( missionCharacter, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeFromMission('missionCharacters', missionCharacter)}><RemoveIcon /></Button>
                <Button onClick={editCharacterConfig(missionCharacter)}>
                  {missionCharacter.character.name}
                </Button>
              </div>
            )}
            {state.charactersConfigList.map( ( missionCharacter, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeCharacterFromConfigList('missionCharacters', missionCharacter)}><RemoveIcon /></Button>
                <Button onClick={editCharacterConfig(missionCharacter)}>
                  {missionCharacter.character.name}
                </Button>
              </div>
            )}
            {state.charactersList.map( ( character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={removeCharacterFromList(character)}><RemoveIcon /></Button>
                <Button onClick={createCharacterConfig(character)}>
                  {character.character.name}
                </Button>
                {state.charactersList.indexOf(character) !== -1 ? <div >!
                  <span>This character has no config!</span>
                </div> : null}
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
            {game === 'game_1_missions' &&
              <CreateGame1Data data={state.mission.game_1_mission_characters} characters={state.mission.characters}
                onChangeCharacter={()=>{}} onJobCheckChange={()=>{}} onCountryCheckChange={()=>{}}/>
            }
            {game === 'game2' &&
              <Game2Data />
            }
        </div>

        <div>
          <div>
            <div>Personagens disponíveis</div>
            {characters.items && characters.items.length > 0 && characters.items
              .filter( character => !state.mission.missionCharacters.find( c => c.character.id === character.id) && !state.charactersList.find( c => c.character.id === character.id) && !state.charactersConfigList.find( c => c.character.id === character.id))
              .map( (character, index) =>
              <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={addCharacterToList(character)}>
                  <AddIcon />
                </Button>
                <Button onClick={editCharacterConfig(character)}>
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
          {state.characterConfig && <EditMissionCharacter missionCharacter={state.characterConfig} onDone={updateCharacterConfig} questions={state.mission.questions} cancel={cancelCharacterConfig}/>}
          {state.newCharacterConfig && <EditNewMissionCharacter character={state.newCharacterConfig} onDone={addCharacterConfig} questions={state.mission.questions} cancel={cancelCharacterConfig}/>}
        </div>

      </div>
    </div>
  )
}

export default CreateMissionGame1
