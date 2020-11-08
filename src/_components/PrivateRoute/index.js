import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({component: Component, roles, ...rest}){
    const user = localStorage.getItem('user')

    console.log('user:', user)

    return (
        <Route {...rest} 
          render={ props => user ?
                <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: {from:props.location} }} />
          }
        />
    )
}

export { PrivateRoute }
