import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { header } from "./header.reducer";
import { music } from "./music.reducer";
import { playSessionControl } from "./playSessionControl.reducer";

import apiReducers from "./api.reducers";
import { game } from "./apiGame.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  header,
  music,
  playSessionControl,
  game,
  ...apiReducers,
});

export default rootReducer;
