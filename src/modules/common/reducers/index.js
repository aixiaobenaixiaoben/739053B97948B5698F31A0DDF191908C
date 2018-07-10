/** @flow */
import {combineReducers} from "redux"

import guide from "./Guide"
import tabBarBadge from "./TabBarBadge"
import login from "./Login/Login"
import registerMobileCheck from "./Register/MobileCheck"
import registerSetPassword from "./Register/SetPassword"


export default combineReducers({
  guide,
  tabBarBadge,
  login,
  registerMobileCheck,
  registerSetPassword,
});