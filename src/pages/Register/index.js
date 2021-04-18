import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiActions, register } from '../../_actions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { MenuItem } from '@material-ui/core'

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


const Register = () => {
  const classes = useStyles()
  const alert = useAlert()

  const { languagesActions } = apiActions

  const [inputs, setInputs] = useState({
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: '',
      language: ''
  })
  const languages = useSelector(state => state.languages.items)
  const [submitted, setSubmitted ] = useState(false)
  const registering = useSelector(state => state.authentication.registering)
  const dispatch = useDispatch()

  function handleChange(e) {
      const {name, value} = e.target
      setInputs(inputs => ({...inputs, [name]: value}))
  }

  React.useEffect(()=>{
		dispatch(languagesActions.getAll())
	}, [])

  function handleSubmit(e) {
      e.preventDefault()
      setSubmitted(true)

      if(inputs.email && inputs.password && inputs.username){
          dispatch(register(inputs))
            .then(() => {
              alert.success('User registred!')
              setTimeout(()=>{
                window.location.href = "/userspace"
              }, 3000)
            })
            .catch(error => {
              alert.error(error)
            })
      } else {
        alert.error('Required fields missing! Please, check your inputs and try again!')
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>                
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus                
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                className={submitted && !inputs.username ? 'danger' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className={submitted && !inputs.email ? 'danger' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={submitted && !inputs.password ? 'danger' : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="language"
                label="Language"
                type="language"
                id="language"
                className={submitted && !inputs.language ? 'danger' : ''}
                onChange={handleChange}
                select
              >
                {languages.map(language => 
                        <MenuItem value={language.id}>{language.lang}</MenuItem>
                      )}
              </TextField>
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
           Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
              Already have an account? Sign in!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Register
