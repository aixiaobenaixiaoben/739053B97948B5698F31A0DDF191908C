/** @flow */
import {combineReducers} from "redux"
import login from "./Login/Login"
import registerMobileCheck from "./Register/MobileCheck"
import registerSetPassword from "./Register/SetPassword"
import resetPasswordMobileCheck from "./ResetPassword/MobileCheck"
import resetPasswordSetPassword from "./ResetPassword/SetPassword"
import loginGesture from "./Login/LoginGesture"
import loginTouchID from "./Login/LoginTouchID"


export default combineReducers({
  login,
  registerMobileCheck,
  registerSetPassword,
  resetPasswordMobileCheck,
  resetPasswordSetPassword,
  loginGesture,
  loginTouchID,
})