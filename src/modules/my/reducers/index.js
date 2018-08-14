/** @flow */
import {combineReducers} from "redux"
import passwordModify from "./Setting/PasswordModify"
import mobileModify from "./Setting/MobileModify"
import profile from "./Profile"


export default combineReducers({
  passwordModify,
  mobileModify,
  profile,
})