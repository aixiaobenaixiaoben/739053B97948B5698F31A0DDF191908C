/** @flow */
import {combineReducers} from "redux"

import guide from "./Guide"
import tabBarBadge from "./TabBarBadge"
import login from "./Login/Login"
import registerMobileCheck from "./Register/MobileCheck"
import registerSetPassword from "./Register/SetPassword"
import resetPasswordMobileCheck from "./ResetPassword/MobileCheck"
import resetPasswordSetPassword from "./ResetPassword/SetPassword"
import loginGesture from "./Login/LoginGesture"


export default combineReducers({
  guide,
  tabBarBadge,
  login,
  registerMobileCheck,
  registerSetPassword,
  resetPasswordMobileCheck,
  resetPasswordSetPassword,
  loginGesture,
})