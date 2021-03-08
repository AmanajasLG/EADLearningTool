import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({component: Component, roles, render, ...rest}){
    return (
        <Route {...rest}
          render={ props => localStorage.getItem('user') ?
                    Component ? <Component {...props} />
                  : render && render(props)
                  : <Redirect to={{ pathname: '/login', state: {from:props.location} }} />
          }
        />
    )
}

export { PrivateRoute }
