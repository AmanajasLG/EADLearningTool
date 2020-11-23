import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiActions } from '../../_actions'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Checkbox from '@material-ui/core/Checkbox'
import { useAlert } from 'react-alert'
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

const CreateQuestion = () => {
    const { questionActions }= apiActions
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        question: '',
        group: 0, 
        correct: "false"
    })
    const [submitted, setSubmitted ] = useState(false)
    const classes = useStyles()
    const alert = useAlert()
    const creating = useSelector(state => state.authentication.registering)

    function handleChange(e) {        
        const {name, value} = e.target
        setInputs(inputs => ({...inputs, [name]: value}))
        console.log(e.target.value)
        console.log(inputs)
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        setSubmitted(true)
        
        if(inputs.question && inputs.group){
            dispatch(questionActions.create(inputs))
            .then(() => {
                alert.success('Question created!')
                document.getElementById('create-question-form').reset()    
            })
            .catch(error => {
                alert.error(error)
            })
        } else {
            alert.error('Required fields missing! Please, check your inputs and try again!')
        }
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="fname"
                        name="question"
                        variant="outlined"
                        fullWidth
                        id="question"
                        label="Question"
                        required
                        autoFocus         
                        className={submitted && (inputs.question === "") ? 'danger' : ''}       
                        onChange={handleChange}                
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
                        className={submitted && !inputs.order ? 'danger' : ''}
                        onChange={handleChange}                
                        />
                        <span id="my-helper-text">Group is a integer that defines the which questions to show in every step. For example, if a question is group 1, it will be displayed on the first user interaction with a character.</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Checkbox
                        // checked={inputs.correct === "true" ? true : false}
                        fullWidth
                        id="correct"
                        label="Correct question"
                        name="correct"
                        value={inputs.correct === "true" ? "true" : "false"}
                        required
                        onChange={handleChange}                
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

export default CreateQuestion
