import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import apiReducers from './api.reducers'

console.log('type:', typeof(reducerBuilder))

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    ...apiReducers,
})

export default rootReducer
