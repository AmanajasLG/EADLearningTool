import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiActions } from '../../_actions'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useAlert } from 'react-alert'
import { makeStyles } from '@material-ui/core/styles'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'

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

const CreateQuestion = () => {
    const { questionsActions }= apiActions
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        question: '',
        group: 0,
        correct: true
    })
    const [submitted, setSubmitted ] = useState(false)
    const classes = useStyles()
    const alert = useAlert()
    const creating = useSelector(state => state.authentication.registering)

    function handleSubmit(e) {
        e.preventDefault()       
        
        console.log(inputs)
        

        // setSubmitted(true)

        // if(inputs.question && inputs.group && inputs.correct){
            
        //     dispatch(questionsActions.create(inputs))
        //     .then(() => {
        //         alert.success('Question created!')
        //         document.getElementById('create-question-form').reset()
        //     })
        //     .catch(error => {
        //         alert.error(error)
        //     })
        // } else {
        //     alert.error('Required fields missing! Please, check your inputs and try again!')
        // }
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                            type="number"
                            variant="outlined"
                            fullWidth
                            id="group"
                            label="Group"
                            name="group"
                            required
                            aria-describedby="my-helper-text"
                            className={submitted && !inputs.group ? 'danger' : ''}
                            onChange={e => {setInputs(inputs => ({...inputs,  group: parseInt(e.target.value)}))}}
                            />
                            <span id="my-helper-text">Group is a integer that defines the which questions to show in every step. For example, if a question is group 1, it will be displayed on the first user interaction with a character.</span>
                        </Grid>
                        <Grid item xs={12} sm={6} justify="center">
                            <FormLabel component="legend">Is question correct?</FormLabel>
                            
                            <RadioGroup
                            aria-label="correct"
                            id="correct"
                            name="correct"
                            value={inputs.correct.toString()}
                            required
                            onChange={e => {setInputs(inputs => ({...inputs, correct: e.target.value === "true" ? true : false}))}}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Correct"/>
                                <FormControlLabel value="false" control={<Radio />} label="Incorrect"/>
                            </RadioGroup>
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

export default CreateQuestion
