import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { characters } from './characters.reducer'
import { header } from './headerTitle.reducer'


const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    characters,
    alert,
    header
})

export default rootReducer
