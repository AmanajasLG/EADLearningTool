import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiActions } from '../../_actions'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useAlert } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import CreateQuestionnaireQuestion from '../CreateQuestionnaireQuestion'
import QuestionnaireQuestion from '../QuestionnaireQuestion'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const CreateQuestionnaire = () => {
    const { questionnairesActions, gamesActions }= apiActions
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        game: ''
    })
    const [game, setGame] = useState('')
    const [submitted, setSubmitted ] = useState(false)
    const [createQuestionnaireQuestion, setCreateQuestionnaireQuestion] = useState(false)
    const classes = useStyles()
    const alert = useAlert()
    const creating = useSelector(state => state.authentication.registering)
    const games = useSelector(state => state.games)

    const [state, setState] = useState({
        questionnaire: {
          game: -1,
          questionnaireQuestions: []
        }
      })
    
    // //for edit
    // if(originalMission && !state.mission.id)
    // setState({...state, mission: {...originalMission}})

    useEffect(()=>{
        dispatch(gamesActions.getAll())
    }, [])

    function handleSubmit(e) {        
        e.preventDefault()
        console.log('inputs', inputs)
        // dispatch(questionnairesActions.create(inputs))
    }

    const handleChange = (e) => {
        setGame(e.target.value);
        setInputs(inputs => ({...inputs, game: e.target.value}))
      };

    const questions = useSelector( state => state.questionnaire_questions) 

    const addToQuestionnaire = (type, data) => () => {
        setState({...state, questionnaire: {...state.questionnaire, [type]:[...state.questionnaire[type], data]}})
      }
    
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Create Questionnaire
                </Typography>
                <form id="create-questionnaire-form" onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="game-label">Game</InputLabel>
                    <Select
                    labelId="game-label"
                    id="game"
                    name="game"
                    value={game}
                    onChange={handleChange}
                    className={submitted && !inputs.game ? 'danger' : ''}
                    >
                    {games.items.map((game) =>
                        <MenuItem value={game.id}>{game.name}</MenuItem>
                    )}
                    </Select>
                    </FormControl>
                    </Grid>

                    <div>
                        <div>Preset questions</div>
                        {questions.items && questions.items.length > 0 && questions.items
                        .filter( question => !state.questionnaire.questionnaireQuestions.find( c => c.id === question.id) )
                        .map( (question, index) =>
                        <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
                            <Button onClick={addToQuestionnaire('questionnaireQuestions', question)}>
                            <AddIcon />
                            </Button>
                            <QuestionnaireQuestion question={question}/>
                        </div>
                        )}
                        <Button onClick={() => setCreateQuestionnaireQuestion(!createQuestionnaireQuestion)}>{createQuestionnaireQuestion? 'Cancel' : 'Create Questionnaire Question'} </Button>
                    { createQuestionnaireQuestion && <CreateQuestionnaireQuestion /> }
                    </div> 
                    
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    {creating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Create
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default CreateQuestionnaire
