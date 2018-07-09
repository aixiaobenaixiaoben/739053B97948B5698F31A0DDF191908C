/** @flow */
import {combineReducers} from "redux"

import guide from "./Guide"
import tabBarBadge from "./TabBarBadge"
import login from "./Login/Login"


export default combineReducers({
  guide,
  tabBarBadge,
  login,
});