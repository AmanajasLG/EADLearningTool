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
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

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

const EditQuestion = ({question, onDone}) => {
    const { questionsActions }= apiActions
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState(question)
    const [submitted, setSubmitted ] = useState(false)
    const classes = useStyles()
    const alert = useAlert()

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(inputs => ({...inputs, [name]: value}))
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                Edit Question
                </Typography>
                <form id="edit-question-form" onSubmit={onDone} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="fname"
                        name="question"
                        variant="outlined"
                        fullWidth
                        id="question"
                        label="Question"
                        value={inputs.question}
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
                        value={inputs.group}
                        required
                        aria-describedby="my-helper-text"
                        className={submitted && !inputs.group ? 'danger' : ''}
                        onChange={handleChange}
                        />
                        <span id="my-helper-text">Group is a integer that defines the which questions to show in every step. For example, if a question is group 1, it will be displayed on the first user interaction with a character.</span>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RadioGroup
                        aria-label="correct"
                        fullWidth
                        id="correct"
                        label="Correct question"
                        name="correct"
                        value={inputs.correct}
                        required
                        onChange={handleChange}
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
                    Save
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default EditQuestion
