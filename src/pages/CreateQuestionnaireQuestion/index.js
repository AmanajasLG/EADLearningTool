import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiActions } from '../../_actions'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

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
}))

const CreateQuestionnaireQuestion = () => {
    const { questionnaire_questionsActions }= apiActions
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        question: '',
        deafult: true,
        questionnaireAnswers: []
    })
    const submitted = false
    const classes = useStyles()
    const creating = useSelector(state => state.authentication.registering)

    function handleSubmit(e) {
        e.preventDefault()
        console.log('inputs', inputs)
        dispatch(questionnaire_questionsActions.create(inputs))
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Create Question
                </Typography>
                <form id="create-question-form" onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            type="textArea"
                            name="question"
                            variant="outlined"
                            id="question"
                            label="Question"
                            fullWidth
                            required
                            className={submitted && (inputs.question === "") ? 'danger' : ''}
                            onChange={e => {setInputs(inputs => ({...inputs, question: e.target.value}))}}
                            />
                        </Grid>
                    </Grid>

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

export default CreateQuestionnaireQuestion
