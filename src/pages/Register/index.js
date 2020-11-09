import React from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../_actions'

const Register = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  return(
    <div>
      REGISTER
      <div>
        Username:
        <input type='text' value={username} onChange={ e => setUsername(e.target.value)} />
      </div>
      <div>
        email:
        <input type='email' value={email} onChange={ e => setEmail(e.target.value)} />
      </div>
      <div>
        Password:
        <input type='password' value={password} onChange={ e => setPassword(e.target.value)} />
      </div>
      <div>
        Confirm Password:
        <input type='password' value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)} />
      </div>
      <button onClick={() => dispatch(userActions.register({username, email, password}))}>Enviar</button>
    </div>
  )
}

export default Register
