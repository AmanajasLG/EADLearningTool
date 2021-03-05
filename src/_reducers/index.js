import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { header } from './headerTitle.reducer'
import { platformConfig } from './platformConfig.reducer'

import apiReducers from './api.reducers'

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    header,
    platformConfig,
    ...apiReducers,
})

export default rootReducer
