import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { header } from './header.reducer'
import { music } from './music.reducer'
import apiDefaultReducers from './apiDefault.reducers'
import { apiCall } from './api.reducer'

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    header,
    music,
    apiCall,
    ...apiDefaultReducers,
})

export default rootReducer
