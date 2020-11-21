import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'

import { login } from '../../_actions'

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [submitted, setSubmitted ] = useState(false)
    const { email, password } = inputs
    const loggingIn = useSelector(state => state.authentication.loggingIn)
    const user = useSelector(state => state.authentication.user)
    const dispatch = useDispatch()
    const classes = useStyles()
    const alert = useAlert()

    function handleChange(e) { 
        const {name, value} = e.target
        setInputs(inputs => ({...inputs, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()

        setSubmitted(true)

        if(email && password){
            dispatch(login(email, password))
              .catch(() => {
                alert.error('Email and/or password invalid! Please, check your inputs and try again!')
              })

        } else {
          alert.error('Email and/or password missing! Please, check your inputs and try again!')
        }
    }
    
    return (
        <Grid container component="main" className={classes.root}>
          {user ? user.user ? <Redirect to='/userspace' /> : null : null}
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className={'form-control' + (submitted && !email ? ' is-invalid' : '')}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Sign in
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/register" variant="body2">
                    Don't have an account yet? Sign up!
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      );


}

export default Login 
