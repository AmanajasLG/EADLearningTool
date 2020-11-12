import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { characters } from './characters.reducer'


const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    characters,
    alert
})

export default rootReducer
